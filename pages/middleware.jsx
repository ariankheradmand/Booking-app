import { NextResponse } from "next/server";

export function middleware(req) {
  const adminAuth = req.cookies.get("admin_auth");

  if (req.nextUrl.pathname.startsWith("/admin") && !adminAuth) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}
