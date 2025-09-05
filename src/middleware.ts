import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isProtected = [
    "/colleges/",
    "/my-college",
    "/profile",
    "/admission",
  ].some((p) => url.pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // Check for auth token in cookies
  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    // Redirect to login if no token
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Verify token
  const payload = verifyToken(token);
  if (!payload) {
    // Redirect to login if invalid token
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/colleges/:path*", "/my-college", "/profile", "/admission"],
};
