import { apiClient, type ApiResponse } from "@/lib/api";
import type { AddCartItemDto, Cart } from "../types/cart.types";

/** Server-side cart for the signed-in customer. Every call returns the updated cart. */
export const cartService = {
  get: async () => (await apiClient.get<ApiResponse<Cart>>("/cart")).data,

  addItem: async (body: AddCartItemDto) =>
    (await apiClient.post<ApiResponse<Cart>>("/cart/items", body)).data,

  updateItem: async (itemId: string, quantity: number) =>
    (await apiClient.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity }))
      .data,

  removeItem: async (itemId: string) =>
    (await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`)).data,
};
