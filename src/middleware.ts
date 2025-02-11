import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get("accessToken")?.value;
  // const refreshToken = request.cookies.get("refreshToken")?.value;

  return NextResponse.next();
}

export const config = {
  matcher: "/rooms",
};
