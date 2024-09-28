import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
  "/property/edit/:path*",
  "/create-property",
  "/cart",
  "/wishlist",
];

export function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  let authToken = null;

  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "authToken") {
        authToken = value;
        break;
      }
    }
  }
  // console.log(authHeader, bearerToken);
  // console.log("========================================================");
  // console.log(authToken);
  // console.log("========================================================");
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!authToken) {
      const redirectUrl = new URL("/login", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (authToken) {
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/property/edit/:path*",
    "/create-property",
    "/cart",
    "/wishlist",
    "/login",
    "/register",
  ],
};
