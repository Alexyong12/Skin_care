import { PROTECTED_ROUTES, ROUTES } from "@/config/routes";

export const ACCESS_TOKEN_COOKIE = "access_token";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/*
 * The token lives in a cookie so that both the browser (API calls) and
 * middleware.ts (route protection) can see it.
 * For stricter security, have the backend set it as an httpOnly cookie instead.
 */

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ACCESS_TOKEN_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function setAccessToken(token: string) {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function clearAccessToken() {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

/** Request interceptor: attach the bearer token. Single place to change auth. */
export function applyRequestInterceptors(
  headers: Headers,
  options: { skipAuth?: boolean },
) {
  const token = options.skipAuth ? null : getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
}

/**
 * Response interceptor for 401: drop the dead token and, only when the user is
 * on a protected page, send them to login (public pages keep working).
 */
export function handleUnauthorized() {
  clearAccessToken();
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const isProtected = PROTECTED_ROUTES.some(
    (r) => path === r || path.startsWith(`${r}/`),
  );
  if (isProtected) {
    window.location.assign(`${ROUTES.login}?redirect=${encodeURIComponent(path)}`);
  }
}
