"use client";

import Link from "next/link";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { getErrorMessage } from "@/lib/api";
import { useCart } from "../hooks/use-cart";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";

/** Full cart page: items on the left, summary on the right (stacked on mobile). */
export function CartList() {
  const { data: cart, isLoading, isError, error, refetch } = useCart();

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />;

  if (!cart || cart.items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Sign in to see saved items, or browse the shop to add some."
        action={
          <div className="flex gap-2">
            <Button asChild>
              <Link href={ROUTES.products}>Shop products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={ROUTES.login}>Sign in</Link>
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <ul className="min-w-0 flex-1 divide-y rounded-lg border bg-card px-4">
        {cart.items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ul>
      <Card className="space-y-4 p-4 sm:p-6 lg:w-80 lg:shrink-0">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <CartSummary cart={cart} />
        <Button asChild className="w-full">
          <Link href={ROUTES.checkout}>Checkout</Link>
        </Button>
      </Card>
    </div>
  );
}
