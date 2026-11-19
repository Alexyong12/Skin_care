import { apiClient, type ApiResponse, type PaginatedResponse } from "@/lib/api";
import type { CrudService, ListParams } from "./types";

/**
 * Build a typed CRUD service for any REST resource.
 *
 * @example
 *   const productService = createService<Product>("/products");
 *   // extend with custom calls: { ...productService, getFeatured: ... }
 *
 * Assumes the backend returns `{ data }` for one item and `{ data, meta }` for lists.
 * If your API differs, change it here once and every module follows.
 */
export function createService<T, C = Partial<T>, U = Partial<T>>(
  basePath: string,
): CrudService<T, C, U> {
  return {
    list: (params?: ListParams) =>
      apiClient.get<PaginatedResponse<T>>(basePath, { params }),

    get: async (id) => (await apiClient.get<ApiResponse<T>>(`${basePath}/${id}`)).data,

    create: async (body) => (await apiClient.post<ApiResponse<T>>(basePath, body)).data,

    update: async (id, body) =>
      (await apiClient.put<ApiResponse<T>>(`${basePath}/${id}`, body)).data,

    remove: async (id) => {
      await apiClient.delete<void>(`${basePath}/${id}`);
    },
  };
}
