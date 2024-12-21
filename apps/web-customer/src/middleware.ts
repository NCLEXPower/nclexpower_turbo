import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname, searchParams } = url;

  const tokenId = request.cookies.get("nclex_customer");
  const proceedToHubUrl = new URL("/hub", request.url);
  const publicRoutes = [
    "/login",
    "/about",
    "/contact",
    "/account/registration",
  ];
  const proceedToLoginUrl = new URL("/login", request.url);

  if (!tokenId) {
    if (pathname.startsWith("/hub")) {
      return NextResponse.redirect(proceedToLoginUrl);
    }
    return NextResponse.next();
  }

  if (tokenId && publicRoutes.includes(pathname)) {
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
