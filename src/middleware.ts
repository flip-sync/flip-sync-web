import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.includes("/images") ||
    path.includes(".png") ||
    path.includes(".jpg") ||
    path.includes(".jpeg") ||
    path.includes(".svg") ||
    path.includes(".ico")
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (path === "/login" && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  // if (!accessToken && !refreshToken) {
  //   if (
  //     path === "/login" ||
  //     path === "/sign-up" ||
  //     path === "/forgot-password"
  //   ) {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (!accessToken && refreshToken) {
  //   console.log("refreshToken", refreshToken);
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login/refresh`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Cookie: `refreshToken=${refreshToken}`,
  //         },
  //         credentials: "include",
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.code === "200_0") {
  //       const response = NextResponse.next();
  //       response.cookies.set({
  //         name: "accessToken",
  //         value: data.data.accessToken,
  //         maxAge: 15 * 60,
  //         path: "/",
  //         secure: true,
  //         sameSite: "lax",
  //       });
  //       return response;
  //     }
  //   } catch (error) {
  //     // return NextResponse.redirect(new URL("/login", request.url));
  //     return NextResponse.next();
  //   }
  // }

  if (path === "/") {
    return NextResponse.redirect(new URL("/rooms", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
