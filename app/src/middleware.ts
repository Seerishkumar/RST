import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/rst-admin");
  const isLoginRoute = pathname === "/login" || pathname === "/rst-login";

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/rst-admin", request.url));
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/rst-login", request.url));
  }

  const session = sessionToken ? await verifySessionToken(sessionToken) : null;

  if (isAdminRoute && (!sessionToken || !session)) {
    const redirectUrl = new URL("/rst-login", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginRoute && sessionToken && session) {
    return NextResponse.redirect(new URL("/rst-admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/rst-admin/:path*", "/login", "/rst-login"],
};
