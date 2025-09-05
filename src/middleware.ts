import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isProtected = ["/colleges/", "/my-college", "/profile"].some((p) =>
    url.pathname.startsWith(p)
  );
  if (!isProtected) return NextResponse.next();

  // Lightweight clientless check using cookie flag set by client on login (optional improvement later)
  // For now, allow and rely on client guard in pages. Keeping middleware as placeholder for 404/redirect ideas.
  return NextResponse.next();
}

export const config = {
  matcher: ["/colleges/:path*", "/my-college", "/profile"],
};
