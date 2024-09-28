"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  // console.log(cookieStore, "cookieStore");
  const authtoken = cookieStore.get("authToken")?.value;
  // console.log(authtoken, "authtoken");
  const notloggedinuserpaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  const loggedinuserpaths =
    request.nextUrl.pathname === "/create-property" ||
    request.nextUrl.pathname === "/wishlist" ||
    request.nextUrl.pathname === "/cart" ||
    request.nextUrl.pathname === "/profile" ||
    request.nextUrl.pathname === "/property/edit/:path*";
  if (notloggedinuserpaths) {
    if (authtoken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (loggedinuserpaths) {
    if (!authtoken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/create-property",
    "/wishlist",
    "/cart",
    "/property/edit/:path*",
    "/profile",
  ],
};
