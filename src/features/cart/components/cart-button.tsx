"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/ui.store";
import { useCart } from "../hooks/use-cart";

/** Header bag icon with item count; opens the cart drawer. */
export function CartButton() {
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const { data: cart } = useCart();
  const count = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={`Open cart, ${count} items`}
      onClick={() => setCartOpen(true)}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}
