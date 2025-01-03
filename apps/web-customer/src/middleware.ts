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
  const { pathname, searchParams } = url;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  const tokenId = request.cookies.get("nclex_customer");
  const proceedToHubUrl = new URL("/hub", request.url);
  const proceedToLoginUrl = new URL("/login", request.url);
  const publicRoutes = [
    "/login",
    "/about",
    "/contact",
    "/account/registration",
  ];

  if (!tokenId) {
    if (pathname.startsWith("/hub")) {
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

  if (!isTokenValid) {
    console.log("Invalid token, redirecting to login.");
    return NextResponse.redirect(proceedToLoginUrl);
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
