import type { PaginatedResponse, QueryParams } from "@/lib/api";

export type EntityId = string | number;

/** Standard list query: pagination, search, sort + any module-specific filter. */
export type ListParams = QueryParams & {
  page?: number;
  perPage?: number;
  search?: string;
  sort?: string;
};

/**
 * Standard CRUD contract every module service follows.
 * T = entity, C = create payload, U = update payload.
 */
export interface CrudService<T, C = Partial<T>, U = Partial<T>> {
  list: (params?: ListParams) => Promise<PaginatedResponse<T>>;
  get: (id: EntityId) => Promise<T>;
  create: (body: C) => Promise<T>;
  update: (id: EntityId, body: U) => Promise<T>;
  remove: (id: EntityId) => Promise<void>;
}
