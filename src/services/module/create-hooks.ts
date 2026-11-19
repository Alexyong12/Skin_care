"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createQueryKeys } from "./create-query-keys";
import type { CrudService, EntityId, ListParams } from "./types";

/**
 * Build the standard React Query hooks for a module from its CRUD service.
 * Mutations automatically invalidate the module's cached lists/details.
 *
 * @example
 *   const productHooks = createHooks("products", productService);
 *   export const useProducts = productHooks.useList;
 */
export function createHooks<T, C = Partial<T>, U = Partial<T>>(
  name: string,
  service: CrudService<T, C, U>,
) {
  const keys = createQueryKeys(name);

  /** Paginated list; keeps the previous page on screen while the next loads. */
  function useList(params?: ListParams) {
    return useQuery({
      queryKey: keys.list(params),
      queryFn: () => service.list(params),
      placeholderData: keepPreviousData,
    });
  }

  /** Single item; stays idle until an id is provided. */
  function useDetail(id?: EntityId | null) {
    return useQuery({
      queryKey: keys.detail(id ?? ""),
      queryFn: () => service.get(id as EntityId),
      enabled: id !== undefined && id !== null && id !== "",
    });
  }

  function useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (body: C) => service.create(body),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.lists() }),
    });
  }

  function useUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, body }: { id: EntityId; body: U }) => service.update(id, body),
      onSuccess: (_data, { id }) => {
        queryClient.invalidateQueries({ queryKey: keys.lists() });
        queryClient.invalidateQueries({ queryKey: keys.detail(id) });
      },
    });
  }

  function useDelete() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: EntityId) => service.remove(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
    });
  }

  return { keys, useList, useDetail, useCreate, useUpdate, useDelete };
}
