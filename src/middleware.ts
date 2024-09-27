import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
  "/property/edit/:id*",
  "/create-property",
  "/cart",
  "/wishlist",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      const redirectUrl = new URL("/login", req.url);
      return NextResponse.redirect(redirectUrl); // Updated line
    }
  }

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (token) {
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl); // Updated line
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/profile",
    "/property/edit/:id*",
    "/create-property",
    "/cart",
    "/wishlist",
    "/login",
    "/register",
  ], // Paths to run middleware on
};
