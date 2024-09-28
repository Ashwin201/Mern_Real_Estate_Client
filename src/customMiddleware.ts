"use client";
import { useEffect } from "react";
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
  useEffect(() => {
    if (protectedRoutes.some((route: any) => pathname?.startsWith(route))) {
      if (!token) {
        router.push("/login");
      }
    }

    if (pathname === "/login" || pathname === "/register") {
      if (token) {
        router.push("/");
      }
    }
  }, [router, token]);
  return "";
};

export default useAuthMiddleware;
