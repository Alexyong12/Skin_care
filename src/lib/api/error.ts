import type { ApiErrorBody } from "./types";

/**
 * Normalized error thrown by the API client for every failed request,
 * so UI code handles one shape instead of fetch/network/HTTP variants.
 * `status` 0 means the server could not be reached at all.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly data: ApiErrorBody | null;

  constructor(status: number, message: string, data: ApiErrorBody | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    // Keeps `instanceof ApiError` working after transpilation.
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /** Validation errors keyed by field name (empty object when none). */
  get fieldErrors(): Record<string, string[]> {
    return this.data?.errors ?? {};
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isValidationError() {
    return this.status === 422;
  }

  get isNetworkError() {
    return this.status === 0;
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

/** Safe, user-facing message from any thrown value. */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
