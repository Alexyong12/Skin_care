"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { cartKeys } from "@/features/cart";
import { orderKeys } from "@/features/orders";
import { checkoutService } from "../services/checkout.service";

/** Place the order, refresh the (now empty) cart, then open the new order page. */
export function usePlaceOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutService.placeOrder,
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
      await queryClient.invalidateQueries({ queryKey: orderKeys.all });
      router.push(ROUTES.order(id));
    },
  });
}
