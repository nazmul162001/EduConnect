import { verifyToken } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isProtected = [
    "/colleges/",
    "/my-college",
    "/profile",
    "/admission",
  ].some((p) => url.pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // Check for JWT auth token (manual login)
  const authToken = req.cookies.get("auth-token")?.value;
  if (authToken) {
    try {
      const payload = verifyToken(authToken);
      if (payload) {
        return NextResponse.next();
      }
    } catch (error) {
      // JWT verification failed, continue to NextAuth check
    }
  }

  // Check for NextAuth session token (Google/GitHub login)
  try {
    const nextAuthToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (nextAuthToken) {
      return NextResponse.next();
    }
  } catch (error) {
    // NextAuth verification failed
  }

  // No valid authentication found, redirect to login
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/my-college", "/profile", "/admission"],
};
