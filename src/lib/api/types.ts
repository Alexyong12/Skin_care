/** Query-string values. `undefined`/`null`/"" are dropped when building the URL. */
export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  /** Appended to the URL as a query string. */
  params?: QueryParams;
  /** Do not attach the Authorization header (e.g. login, register). */
  skipAuth?: boolean;
}

/** Envelope for a single resource: `{ data: T }`. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

/** Envelope for a list: `{ data: T[], meta: {...} }`. */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Error body the backend is expected to return on 4xx/5xx. */
export interface ApiErrorBody {
  message?: string;
  /** Validation errors keyed by field name. */
  errors?: Record<string, string[]>;
}
