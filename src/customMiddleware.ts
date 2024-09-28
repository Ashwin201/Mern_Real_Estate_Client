"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "./store/auth";

const protectedRoutes = [
  "/profile",
  "/property/edit/:path*",
  "/create-property",
  "/cart",
  "/wishlist",
];

const useAuthMiddleware = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const token = user?.token;
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  //   useEffect(() => {
  //     if (isInitialMount.current) {
  //       isInitialMount.current = false;
  //       return;
  //     }

  //     const isProtectedRoute = protectedRoutes.some((route) =>
  //       pathname?.startsWith(route)
  //     );

  //     if (isProtectedRoute && !token) {
  //       router.push("/login");
  //     } else if ((pathname === "/login" || pathname === "/register") && token) {
  //       router.push("/");
  //     }
  //   }, [pathname, token]);

  return "";
};

export default useAuthMiddleware;
