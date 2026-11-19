"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "@/lib/api";
import { cartService } from "../services/cart.service";
import type { AddCartItemDto } from "../types/cart.types";

export const cartKeys = { all: ["cart"] as const };

/** The signed-in customer's cart. Stays idle (no request) when signed out. */
export function useCart() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: cartService.get,
    enabled: typeof window !== "undefined" && Boolean(getAccessToken()),
    retry: false,
  });
}

/** Mutations return the updated cart, so write it straight into the cache. */
function useCartMutation<V>(fn: (variables: V) => ReturnType<typeof cartService.get>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (cart) => queryClient.setQueryData(cartKeys.all, cart),
  });
}

export const useAddToCart = () =>
  useCartMutation((body: AddCartItemDto) => cartService.addItem(body));

export const useUpdateCartItem = () =>
  useCartMutation(({ itemId, quantity }: { itemId: string; quantity: number }) =>
    cartService.updateItem(itemId, quantity),
  );

export const useRemoveCartItem = () =>
  useCartMutation((itemId: string) => cartService.removeItem(itemId));
