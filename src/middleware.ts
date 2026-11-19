import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROUTES, PROTECTED_ROUTES, ROUTES } from "@/config/routes";

const ACCESS_TOKEN_COOKIE = "access_token"; // keep in sync with lib/api/interceptors.ts

const matches = (path: string, routes: readonly string[]) =>
  routes.some((r) => path === r || path.startsWith(`${r}/`));

/**
 * Route protection (runs before the page renders):
 * - signed-out visitor on /account, /orders, /checkout -> /login?redirect=...
 * - signed-in customer on /login or /register -> /account
 * This is a UX gate only; the backend must still authorize every API call.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);

  if (matches(pathname, PROTECTED_ROUTES) && !hasToken) {
    const url = new URL(ROUTES.login, request.url);
    url.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (matches(pathname, AUTH_ROUTES) && hasToken) {
    return NextResponse.redirect(new URL(ROUTES.account, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
};
