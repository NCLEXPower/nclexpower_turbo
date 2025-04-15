import { ValidateTokenParams } from "core-library/api/types";
import { GoLiveStatusSsr } from "core-library/types/global";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": process.env.NEXT_PUBLIC_XAPI_KEY,
  "X-Environment": process.env.NEXT_PUBLIC_SYSENV,
  "X-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
} as HeadersInit | undefined;

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const tokenId = request.cookies.get("nclex_customer");
  const accountId = request.cookies.get("nclex_account");
  const ipGeo = request.cookies.get("geocountry");
  const proceedToHubUrl = new URL("/hub", request.url);
  const proceedToHome = new URL("/", request.url);
  const proceedToLoginUrl = new URL("/login", request.url);
  const proceedToDeniedCountry = new URL("/blocked", request.url);
  const proceedToComingSoon = new URL("/coming-soon", request.url);
  const proceed2faUrl = new URL("/account/verification/otp", request.url);
  const proceedPaymentSetupUrl = new URL("/hub/payment-setup", request.url);
  const publicRoutes = [
    "/login",
    "/about",
    "/contact",
    "/account/registration",
    "/",
  ];
  const { pathname, searchParams } = url;
  const country = request.geo?.country ?? "";
  const response = withCustomCookie(NextResponse.next(), country);
  const goLiveStatus = await IsCountryBlocked(country, baseUrl);
  const isBlocked = goLiveStatus?.blocked;
  const isLive = goLiveStatus?.goLiveStatus;
  const isComingSoonPage = pathname.includes("coming-soon");
  const isBlockedPage = pathname.includes("blocked");

  if ((isComingSoonPage && !isLive) || (isBlockedPage && !isBlocked)) {
    return NextResponse.redirect(proceedToHome);
  }

  if (!pathname.includes("blocked") && goLiveStatus && goLiveStatus?.blocked) {
    return withCustomCookie(
      NextResponse.redirect(proceedToDeniedCountry),
      country
    );
  }

  if (!isComingSoonPage && isLive) {
    return withCustomCookie(
      NextResponse.redirect(proceedToComingSoon),
      country
    );
  }

  if (publicRoutes.includes(pathname)) {
    url.pathname = `/nclex${pathname}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/nclex")) {
    url.pathname = pathname.replace(/^\/nclex/, "") || "/";
    return NextResponse.rewrite(url);
  }

  // const hasTwoFactorAuth = await HasTwoFactorAuth(
  //   { accountId: accountId?.value ?? "" },
  //   baseUrl
  // );

  // if (hasTwoFactorAuth && !tokenId) {
  //   if (pathname !== "/account/verification/otp") {
  //     return NextResponse.redirect(proceed2faUrl);
  //   }
  //   return NextResponse.next();
  // }

  if (!tokenId) {
    if (pathname.startsWith("/hub") || pathname === "/hub/payment-setup") {
      return NextResponse.redirect(proceedToLoginUrl);
    }
    return response;
  }

  const isTokenValid = await validateTokenSsr(
    {
      accessToken: tokenId.value,
      appName: process.env.NEXT_PUBLIC_BASE_APP ?? "no-app",
    },
    baseUrl,
    headers
  );

  if (!isTokenValid) {
    return NextResponse.redirect(proceedToLoginUrl);
  }

  const isPaid = await IsAccountPaid(
    {
      accountId: accountId?.value ?? "",
      accessToken: tokenId.value,
    },
    baseUrl
  );

  if (pathname === "/hub/payment-setup" && !isPaid) {
    return NextResponse.next();
  }

  if (pathname === "/hub" && !isPaid) {
    return NextResponse.redirect(proceedPaymentSetupUrl);
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(proceedToHubUrl);
  }

  if (pathname === "/hub/payment-setup") {
    if (!tokenId) {
      return NextResponse.redirect(proceedToLoginUrl);
    }
    return NextResponse.next();
  }

  if (pathname === "/nclex/login") {
    return NextResponse.next();
  }

  if (
    pathname === "/hub" &&
    (searchParams.has("payment_intent") ||
      searchParams.has("payment_intent_client_secret") ||
      searchParams.has("redirect_status"))
  ) {
    const params = {
      paymentIntentId: searchParams.get("payment_intent") ?? "",
      accountId: accountId?.value ?? "",
      country: ipGeo?.value ?? request.geo?.country,
      accessToken: tokenId.value,
    };
    await paymentConfirmed(params, baseUrl);
    searchParams.delete("payment_intent");
    searchParams.delete("payment_intent_client_secret");
    searchParams.delete("redirect_status");

    url.search = searchParams.toString();

    return NextResponse.redirect(url);
  }

  await userAgentValidation(request);
  await enforceHttpToHttps(request);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/hub/:path*",
    "/login",
    "/about",
    "/contact",
    "/account/registration",
    "/blocked",
    "/coming-soon",
    "/",
    "/nclex/:path*",
  ],
};

function withCustomCookie(res: NextResponse, country: string) {
  res.cookies.set("client_country", country);
  return res;
}

/**
 * Isolate all functions below to core-library..
 */

export async function IsCountryBlocked(
  clientCountry: string | undefined,
  publicUrl: string | undefined
): Promise<GoLiveStatusSsr | undefined> {
  try {
    if (!clientCountry) {
      return;
    }

    if (!publicUrl) {
      return;
    }

    const encodedCountry = encodeURIComponent(clientCountry);
    const url = `${publicUrl}/api/v2/internal/baseInternal/active-schedule?clientCountry=${encodedCountry}`;

    const requestHeaders: HeadersInit = {
      ...(headers || {}),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: requestHeaders,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error occurred while checking ispaid:", error);
  }
}

export async function IsAccountPaid(
  params: { accountId: string; accessToken: string | undefined | null },
  publicUrl: string | undefined
) {
  if (!params.accessToken) return;

  try {
    const requestHeaders: HeadersInit = {
      ...headers,
      Authorization: `Bearer ${params.accessToken}`,
    };

    const accountId = params.accountId;

    const response = await fetch(`${publicUrl}/api/v1/Customer/account-paid`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ accountId }),
    });
    return response.json();
  } catch (error) {
    console.error("Error occurred while checking ispaid:", error);
  }
}

export async function HasTwoFactorAuth(
  params: { accountId: string },
  publicUrl: string | undefined
): Promise<boolean> {
  try {
    if (!publicUrl) {
      throw new Error("Public URL is undefined");
    }

    const requestHeaders: HeadersInit = {
      ...headers,
    };
    const response = await fetch(
      `${publicUrl}/api/v2/internal/baseInternal/identify-two-factor-authentication`,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (typeof result !== "boolean") {
      throw new Error("Unexpected response format from the API");
    }

    return result;
  } catch (error) {
    console.error("Error in HasTwoFactorAuth:", error);
    return false;
  }
}

async function paymentConfirmed(
  params: {
    paymentIntentId: string;
    accountId: string;
    country?: string | undefined;
    accessToken: string | undefined | null;
  },
  publicUrl: string | undefined
) {
  if (!params.accessToken) return;

  try {
    const requestHeaders: HeadersInit = {
      ...headers,
      Authorization: `Bearer ${params.accessToken}`,
    };

    const response = await fetch(
      `${publicUrl}/api/v1/Customer/payment-confirmed`,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(params),
      }
    );

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error occurred while confirming payment:", error);
  }
}

async function validateTokenSsr(
  params: ValidateTokenParams,
  publicUrl: string | undefined,
  customHeaders: HeadersInit | undefined
) {
  if (!params.accessToken) return false;

  try {
    const response = await fetch(
      `${publicUrl}/api/v2/internal/baseInternal/validate-token`,
      {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(params),
      }
    );

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Token validation failed:`, error);
    return false;
  }
}

const blockedUserAgents = ["curl", "PostmanRuntime", "BadBot"];

async function userAgentValidation(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  if (blockedUserAgents.some((agent) => userAgent.includes(agent))) {
    return new NextResponse(
      JSON.stringify({ error: "Access Denied: Disallowed User-Agent " }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next();
}

async function enforceHttpToHttps(request: NextRequest) {
  const url = request.nextUrl;

  if (url.protocol === "http:") {
    return NextResponse.redirect(`https://${url.host}${url.pathname}`, 301);
  }

  const response = NextResponse.next();
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}
