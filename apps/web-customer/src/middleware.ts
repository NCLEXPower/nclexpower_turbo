import { ValidateTokenParams } from "core-library/api/types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  const analytics = request.cookies.get("analytics");
  const proceedToHubUrl = new URL("/hub", request.url);
  const proceedToLoginUrl = new URL("/login", request.url);
  const proceedPaymentSetupUrl = new URL("/hub/payment-setup", request.url);
  const publicRoutes = [
    "/login",
    "/about",
    "/contact",
    "/account/registration",
  ];
  const { pathname, searchParams } = url;

  if (pathname === "/hub/payment-setup") {
    if (!tokenId) {
      return NextResponse.redirect(proceedToLoginUrl);
    }
    return NextResponse.next();
  }

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!tokenId) {
    if (pathname.startsWith("/hub") || pathname === "/hub/payment-setup") {
      return NextResponse.redirect(proceedToLoginUrl);
    }
    return NextResponse.next();
  }

  const isTokenValid = await validateTokenSsr(
    {
      accessToken: tokenId.value,
      appName: process.env.NEXT_PUBLIC_BASE_APP ?? "no-app",
    },
    baseUrl,
    headers
  );

  const isPaid = await IsAccountPaid(
    {
      accountId: accountId?.value ?? "",
      accessToken: tokenId.value,
    },
    baseUrl
  );

  if (!isTokenValid) {
    return NextResponse.redirect(proceedToLoginUrl);
  }

  if (typeof isPaid !== "undefined" && !isPaid) {
    return NextResponse.redirect(proceedPaymentSetupUrl);
  }

  await userAgentValidation(request);
  await enforceHttpToHttps(request);

  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(proceedToHubUrl);
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
      analyticsParams: analytics?.value ?? "",
      accessToken: tokenId.value,
    };
    await paymentConfirmed(params, baseUrl);
    searchParams.delete("payment_intent");
    searchParams.delete("payment_intent_client_secret");
    searchParams.delete("redirect_status");

    url.search = searchParams.toString();

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/hub/:path*",
    "/login",
    "/about",
    "/contact",
    "/account/registration",
  ],
};

/**
 * Isolate all functions below to core-library..
 */

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

async function paymentConfirmed(
  params: {
    paymentIntentId: string;
    accountId: string;
    analyticsParams: string;
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
