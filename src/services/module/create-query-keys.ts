import type { EntityId, ListParams } from "./types";

/**
 * Centralized, predictable query keys for one module.
 * Invalidate `keys.all` to refresh everything for that module.
 */
export function createQueryKeys(name: string) {
  const all = [name] as const;
  return {
    all,
    lists: () => [...all, "list"] as const,
    list: (params?: ListParams) => [...all, "list", params ?? {}] as const,
    details: () => [...all, "detail"] as const,
    detail: (id: EntityId) => [...all, "detail", id] as const,
  };
}

export type QueryKeys = ReturnType<typeof createQueryKeys>;
