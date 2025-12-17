import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Always allow Next.js API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Always allow login page
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // 🔐 Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  return NextResponse.next();
}
