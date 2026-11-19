import { formatCurrency } from "@/lib/utils/format";
import type { Cart } from "../types/cart.types";

export function CartSummary({ cart }: { cart: Cart }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd>{formatCurrency(cart.subtotal)}</dd>
      </div>
      {cart.shipping !== undefined && (
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd>{cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}</dd>
        </div>
      )}
      <div className="flex justify-between border-t pt-2 text-base font-semibold">
        <dt>Total</dt>
        <dd>{formatCurrency(cart.total)}</dd>
      </div>
    </dl>
  );
}
