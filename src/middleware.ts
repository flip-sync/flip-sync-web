import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isPublicPath = ["/login", "/sign-up", "/forgot-password"].includes(
    request.nextUrl.pathname
  );

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
