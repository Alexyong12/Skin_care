import { env } from "@/config/env";
import { ApiError } from "./error";
import { applyRequestInterceptors, handleUnauthorized } from "./interceptors";
import type { ApiErrorBody, QueryParams, RequestOptions } from "./types";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function buildUrl(path: string, params?: QueryParams) {
  const base = env.API_URL.replace(/\/+$/, "");
  const url = new URL(`${base}/${path.replace(/^\/+/, "")}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Central HTTP layer: base URL, auth, JSON parsing, normalized errors. */
async function request<T>(
  method: Method,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const { params, skipAuth, headers: extraHeaders, ...init } = options;

  const headers = new Headers(extraHeaders);
  headers.set("Accept", "application/json");
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isForm) headers.set("Content-Type", "application/json");
  applyRequestInterceptors(headers, { skipAuth });

  let res: Response;
  try {
    res = await fetch(buildUrl(path, params), {
      ...init,
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isForm
            ? (body as FormData)
            : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      0,
      "Cannot reach the server. Check your connection and try again.",
    );
  }

  const payload = await parseBody(res);

  if (!res.ok) {
    if (res.status === 401 && !skipAuth) handleUnauthorized();
    const data =
      payload && typeof payload === "object" ? (payload as ApiErrorBody) : null;
    throw new ApiError(
      res.status,
      data?.message || res.statusText || "Request failed",
      data,
    );
  }

  return payload as T;
}

/** The only way the app talks to the backend. Nobody calls `fetch` directly. */
export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
