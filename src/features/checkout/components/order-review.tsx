"use client";

import { Loader } from "@/components/common/loader";
import { Card } from "@/components/ui/card";
import { CartSummary, useCart } from "@/features/cart";
import { formatCurrency } from "@/lib/utils/format";

/** Read-only recap of the cart next to the checkout form. */
export function OrderReview() {
  const { data: cart, isLoading } = useCart();

  if (isLoading) return <Loader />;
  if (!cart || cart.items.length === 0) return null;

  return (
    <Card className="space-y-4 p-4 sm:p-6">
      <h2 className="text-lg font-semibold">Your order</h2>
      <ul className="divide-y text-sm">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4 py-2">
            <span className="min-w-0 truncate">
              {item.name}{" "}
              <span className="text-muted-foreground">&times; {item.quantity}</span>
            </span>
            <span className="shrink-0">{formatCurrency(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <CartSummary cart={cart} />
    </Card>
  );
}
