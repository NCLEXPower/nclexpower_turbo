/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { GoLiveStatusSsr } from "core-library/types/global";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const OTP_VERIFICATION_PATH = "/account/verification/otp";
const ENV = process.env.NODE_ENV;
const API_URL =
  ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL;

const GEO_BLOCKING_CONFIG = {
  blockedPagePath: "/blocked",
  comingSoonPagePath: "/coming-soon",
  homePagePath: "/",
  countryCookieName: "client_country",
};

const SECURITY_HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": process.env.NEXT_PUBLIC_XAPI_KEY!,
  "X-Environment": process.env.NEXT_PUBLIC_SYSENV!,
  "X-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  "X-Platform":
    process.env.NEXT_PUBLIC_BASE_APP === "webc_app" ? "true" : "false",
} as const;

type AuthParams = {
  token?: string;
  reference?: string;
  twoFactorToken?: string;
};

type ExtraConfigResponse = {
  //duplicated from types.ts in api requests.
  config: {
    isPaid: boolean;
    isError: boolean;
    isNewlyCreated: boolean;
  };
};

const PUBLIC_ROUTES = [
  "/login",
  "/about",
  "/contact",
  "/account/registration",
  "/",
  "/coming-soon",
  //other public routes...
];

const BLOCKED_USER_AGENTS = [
  "curl",
  "PostmanRuntime",
  "BadBot",
  "wget",
  "python-requests",
  "HTTPie",
  "Go-http-client",
  "Java/",
  "libwww-perl",
  "WinHTTP",
  "RestSharp",
  "node-fetch",
];

const SENSITIVE_QUERY_PARAMS = [
  "payment_intent",
  "payment_intent_client_secret",
  "redirect_status",
  "token",
  "auth",
  "api_key",
  "secret",
  "password",
];

const SECURITY_CONFIG = {
  hsts: "max-age=63072000; includeSubDomains; preload",
  permissionsPolicy: [
    "geolocation=()",
    "microphone=()",
    "camera=()",
    "fullscreen=(self)",
    "payment=()",
  ].join(", "),
};

export async function middleware(request: NextRequest) {
  try {
    const geoResponse = await handleGeoBlocking(request);
    if (geoResponse) return geoResponse;

    const securityResponse = await applySecurityHeaders(request);
    if (securityResponse) return securityResponse;

    const authState = await getAuthState(request);
    const twoFactorResponse = await handle2FAVerification(request, {
      twoFactorToken: authState.twoFactorToken,
    });
    if (twoFactorResponse) return twoFactorResponse;

    const routeResponse = await handleRouteProtection(
      request,
      authState.isAuthenticated,
      { token: authState.token, reference: authState.reference }
    );
    if (routeResponse) return routeResponse;

    return applyFinalSecurityHeaders(NextResponse.next());
  } catch (error) {
    console.error("Middleware execution failed:", error);
    return new NextResponse(null, { status: 200 });
  }
}

async function handleGeoBlocking(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const country = request.geo?.country ?? "";
    if (!country) return null;

    const geoStatus = await fetchGoLiveStatus(country);
    if (!geoStatus) return null;

    const url = request.nextUrl;
    const isAllowedCountry =
      geoStatus.goLive?.countries.includes(country) ?? false;
    const isBlockedPage = url.pathname.includes(
      GEO_BLOCKING_CONFIG.blockedPagePath
    );

    if (!isAllowedCountry && !isBlockedPage) {
      return withCountryCookie(
        NextResponse.redirect(
          new URL(GEO_BLOCKING_CONFIG.blockedPagePath, request.url)
        ),
        country
      );
    }

    if (isAllowedCountry && isBlockedPage) {
      return withCountryCookie(
        NextResponse.redirect(
          new URL(GEO_BLOCKING_CONFIG.homePagePath, request.url)
        ),
        country
      );
    }

    return null;
  } catch (error) {
    console.error("Geo-blocking check failed, proceeding without it:", error);
    return null; // Fail open - don't block if geo check fails
  }
}

async function fetchGoLiveStatus(
  country: string
): Promise<GoLiveStatusSsr | null> {
  if (!country) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500); // Shorter timeout

  try {
    const response = await fetch(
      `${API_URL}/api/v2/internal/baseInternal/active-schedule?clientCountry=${encodeURIComponent(country)}`,
      {
        headers: SECURITY_HEADERS,
        signal: controller.signal,
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error: any) {
    if (error.name !== "AbortError") {
      console.error("Geo status fetch failed:", error);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function getAuthState(request: NextRequest) {
  const token = request.cookies.get("arxtoken")?.value;
  const reference = request.cookies.get("accountref")?.value;
  const twoFactorToken = request.cookies.get("2faToken")?.value;

  if (!request.nextUrl.pathname.startsWith("/hub")) {
    return { token, reference, twoFactorToken, isAuthenticated: false };
  }

  const isAuthenticated = token
    ? await validateTokenWithRetry(token, 2)
    : false;
  return { token, reference, twoFactorToken, isAuthenticated };
}

function withCountryCookie(
  response: NextResponse,
  country: string
): NextResponse {
  response.cookies.set(GEO_BLOCKING_CONFIG.countryCookieName, country, {
    path: "/",
    secure: ENV === "production",
    sameSite: "strict",
    httpOnly: true,
  });
  return response;
}

async function applySecurityHeaders(request: NextRequest) {
  const url = request.nextUrl;

  if (url.protocol === "http:" && ENV === "production") {
    return NextResponse.redirect(`https://${url.host}${url.pathname}`, 301);
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (BLOCKED_USER_AGENTS.some((agent) => userAgent.includes(agent))) {
    return new NextResponse("Access Denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "X-Blocked-Reason": "Disallowed User-Agent",
      },
    });
  }

  return null;
}

function applyFinalSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("Strict-Transport-Security", SECURITY_CONFIG.hsts);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", SECURITY_CONFIG.permissionsPolicy);
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}

async function handleRouteProtection(
  request: NextRequest,
  isAuthenticated: boolean,
  params: AuthParams
): Promise<NextResponse | null> {
  const { pathname, searchParams } = request.nextUrl;

  if (SENSITIVE_QUERY_PARAMS.some((param) => searchParams.has(param))) {
    const cleanUrl = request.nextUrl.clone();
    SENSITIVE_QUERY_PARAMS.forEach((param) =>
      cleanUrl.searchParams.delete(param)
    );
    return NextResponse.redirect(cleanUrl);
  }

  if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/hub", request.url));
  }

  if (pathname.startsWith("/hub")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/404", request.url));
    }

    return await handlePaymentRequirement(request, params);
  }

  return null;
}

async function handle2FAVerification(
  request: NextRequest,
  params: AuthParams
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(OTP_VERIFICATION_PATH)) return null;
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) return null;

  if (!params.twoFactorToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    if (params.twoFactorToken) {
      const isValid = await validate2FAToken(params.twoFactorToken);
      if (isValid) return null;
    }

    return handleInvalid2FAState(request);
  } catch (error) {
    console.error("2FA verification error:", error);
    return handleInvalid2FAState(request, true);
  }
}

async function validate2FAToken(twoFactorToken: string): Promise<boolean> {
  const response = await secureFetch(
    `${API_URL}/api/v2/internal/baseInternal/app/two-factor-authentication/validate-token`,
    {
      headers: {
        ...SECURITY_HEADERS,
        TwoFactorAuthorization: twoFactorToken,
      },
    }
  );
  return response.ok && (await response.json()).valid;
}

function handleInvalid2FAState(
  request: NextRequest,
  clearAll = false
): NextResponse {
  const response = NextResponse.redirect(
    new URL(OTP_VERIFICATION_PATH, request.url)
  );
  response.cookies.delete("2faToken");

  if (clearAll) {
    response.cookies.delete("arxtoken");
    response.cookies.delete("accountref");
  }

  return response;
}

async function handlePaymentRequirement(
  request: NextRequest,
  params: AuthParams
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const PAYMENT_PATHS = [
    "/hub/payment-setup",
    "/hub/payment-success", // not existing yet. just adding here.
    "/hub/payment-cancel", // same...
  ];

  try {
    const config = await getExtraConfigByReference(params);
    if (!config?.config) return null;

    if (PAYMENT_PATHS.includes(pathname) && config.config.isPaid) {
      return NextResponse.redirect(new URL("/hub", request.url));
    }

    if (!PAYMENT_PATHS.includes(pathname) && !config.config.isPaid) {
      return NextResponse.redirect(new URL("/hub/payment-setup", request.url));
    }
  } catch (error) {
    console.error("Payment requirement check failed:", error);
  }
  return null;
}

async function validateTokenWithRetry(
  token: string,
  retries: number
): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      const isValid = await validateToken(token);
      if (isValid) return true;

      if (i < retries - 1)
        await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Token validation attempt ${i + 1} failed:`, error);
    }
  }
  return false;
}

async function validateToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const url = `${API_URL}/api/v2/internal/baseInternal/app/validate-token`;

    const response = await secureFetch(url, {
      headers: {
        ...SECURITY_HEADERS,
        Authorization: `Bearer ${token}`,
        "X-Request-ID": crypto.randomUUID(),
      },
    });

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.ok;
    }

    return response.ok;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
}

async function getExtraConfigByReference(
  params: AuthParams
): Promise<ExtraConfigResponse | null> {
  if (!params.token || !params.reference) return null;

  try {
    const response = await secureFetch(
      `${API_URL}/api/v2/internal/baseInternal/get-extra-config-by-reference`,
      {
        headers: {
          ...SECURITY_HEADERS,
          Authorization: `Bearer ${params.token}`,
          "account-reference": params.reference,
          "X-Request-ID": crypto.randomUUID(),
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

async function secureFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeout);
    console.error("Fetch error:", error);
    throw error;
  }
}

export const config = {
  matcher: [
    "/hub/:path*",
    "/login",
    "/about",
    "/contact",
    "/account/registration",
    "/coming-soon",
    "/",
    "/nclex/:path*",
  ],
};

/**
 * Isolate all functions below to core-library..
 */
