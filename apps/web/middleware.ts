import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && req.nextUrl.pathname == profileRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl.origin));
  }

  if (isLoggedIn && authRoutes.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/profile", req.nextUrl.origin));
  }

  if (
    isLoggedIn &&
    !req.auth?.user?.name &&
    req.nextUrl.pathname != profileRoute
  ) {
    return Response.redirect(new URL(profileRoute, req.nextUrl.origin));
  }
});

const authRoutes = ["/auth/login", "/auth/sign-up"];
const profileRoute = "/profile";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
