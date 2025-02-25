// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   if (
//     path.includes("/images") ||
//     path.includes(".png") ||
//     path.includes(".jpg") ||
//     path.includes(".jpeg") ||
//     path.includes(".svg") ||
//     path.includes(".ico")
//   ) {
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   if (path === "/login" && (accessToken || refreshToken)) {
//     return NextResponse.redirect(new URL("/rooms", request.url));
//   }

//   if (!accessToken && !refreshToken) {
//     if (
//       path === "/login" ||
//       path === "/sign-up" ||
//       path === "/forgot-password"
//     ) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   console.log("accessToken", accessToken);
//   console.log("refreshToken", refreshToken);
//   if (!accessToken && refreshToken) {
//     console.log("refreshToken", refreshToken);
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login/refresh`,
//         {
//           method: "POST",
//           headers: {
//             Cookie: `refreshToken=${refreshToken}`,
//           },
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (data.code === "200_0") {
//         const response = NextResponse.next();
//         response.cookies.set({
//           name: "accessToken",
//           value: data.data.accessToken,
//           maxAge: 15 * 60,
//           path: "/",
//           secure: true,
//           sameSite: "lax",
//         });
//         return response;
//       }
//     } catch (error) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   if (path === "/") {
//     return NextResponse.redirect(new URL("/rooms", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import isValidToken from "@/libs/isValidToken";

export async function middleware(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API_URL", API_URL);

  const cookieStore = await cookies();

  const accesstoken = cookieStore.get("accesstoken");
  const refreshtoken = cookieStore.get("refreshtoken");

  if (!accesstoken?.value || !refreshtoken?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
    accesstoken: accesstoken.value,
    refreshtoken: refreshtoken.value,
  });

  if (!isRefreshTokenValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAccessTokenValid) {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `refreshtoken=${refreshtoken.value}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (response.ok) {
        const res = NextResponse.next();
        const responseCookies = new ResponseCookies(response.headers);

        const accessToken = responseCookies.get("accesstoken");

        const refreshToken = responseCookies.get("refreshtoken");

        if (accessToken) {
          res.cookies.set("accesstoken", accessToken.value, {
            httpOnly: accessToken.httpOnly,
            sameSite: accessToken.sameSite,
            path: accessToken.path,
            secure: accessToken.secure,
          });
        }

        if (refreshToken) {
          res.cookies.set("refreshtoken", refreshToken.value, {
            httpOnly: refreshToken.httpOnly,
            sameSite: refreshToken.sameSite,
            path: refreshToken.path,
            secure: refreshToken.secure,
          });
        }

        return res;
      }
    } catch (error) {
      console.error("엑세스 토큰 재발급 중 오류 발생:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/security"],
};
