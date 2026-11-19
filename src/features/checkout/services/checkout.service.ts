import { apiClient, type ApiResponse } from "@/lib/api";
import type { CheckoutInput } from "../schemas/checkout.schema";
import type { PlaceOrderResult } from "../types/checkout.types";

export const checkoutService = {
  /** Turn the current cart into an order. */
  placeOrder: async (body: CheckoutInput) =>
    (await apiClient.post<ApiResponse<PlaceOrderResult>>("/checkout", body)).data,
};
