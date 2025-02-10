import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && refreshToken) {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/rooms",
};
