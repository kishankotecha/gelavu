import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass-through with security headers
  const response = NextResponse.next();
  response.headers.set("x-gelavu-route", pathname);

  return response;
}

export const config = {
  matcher: [
    "/host/:path*",
    "/umpire/:path*",
    "/admin/:path*",
    "/my-games/:path*",
    "/profile/:path*",
    "/tournaments/:slug*/register/:path*",
    "/partner-draw/:path*",
  ],
};
