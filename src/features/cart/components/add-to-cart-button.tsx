"use client";

import { ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { getAccessToken } from "@/lib/api";
import { useUiStore } from "@/stores/ui.store";
import { useAddToCart } from "../hooks/use-cart";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  productId: string;
}

/** Adds one item; sends signed-out visitors to login first, then opens the cart drawer. */
export function AddToCartButton({ productId, children, ...props }: AddToCartButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const addToCart = useAddToCart();

  const handleClick = () => {
    if (!getAccessToken()) {
      router.push(`${ROUTES.login}?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    addToCart.mutate({ productId, quantity: 1 }, { onSuccess: () => setCartOpen(true) });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={addToCart.isPending || props.disabled}
      {...props}
    >
      <ShoppingBag className="h-4 w-4" />
      {children ?? (addToCart.isPending ? "Adding..." : "Add to cart")}
    </Button>
  );
}
