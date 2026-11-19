"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { ROUTES } from "@/config/routes";
import { useUiStore } from "@/stores/ui.store";
import { useCart } from "../hooks/use-cart";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";

/** Slide-over cart shown after "Add to cart" and from the header bag icon. */
export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const setOpen = useUiStore((s) => s.setCartOpen);
  const close = () => setOpen(false);
  const { data: cart } = useCart();
  const isEmpty = !cart || cart.items.length === 0;

  return (
    <Sheet open={open} onClose={close} title="Your cart" side="right">
      {isEmpty ? (
        <p className="p-4 text-sm text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y overflow-y-auto px-4">
            {cart.items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </ul>
          <div className="space-y-3 border-t p-4">
            <CartSummary cart={cart} />
            <Button asChild className="w-full" onClick={close}>
              <Link href={ROUTES.checkout}>Checkout</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" onClick={close}>
              <Link href={ROUTES.cart}>View cart</Link>
            </Button>
          </div>
        </div>
      )}
    </Sheet>
  );
}
