"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";
import { useRemoveCartItem, useUpdateCartItem } from "../hooks/use-cart";
import type { CartItem } from "../types/cart.types";

export function CartItemRow({ item }: { item: CartItem }) {
  const update = useUpdateCartItem();
  const remove = useRemoveCartItem();
  const busy = update.isPending || remove.isPending;

  return (
    <li className="flex gap-3 py-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 truncate font-medium">{item.name}</p>
          <p className="shrink-0 text-sm font-medium">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              aria-label="Decrease quantity"
              disabled={busy || item.quantity <= 1}
              onClick={() =>
                update.mutate({ itemId: item.id, quantity: item.quantity - 1 })
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm" aria-live="polite">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Increase quantity"
              disabled={busy}
              onClick={() =>
                update.mutate({ itemId: item.id, quantity: item.quantity + 1 })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Remove ${item.name}`}
            disabled={busy}
            onClick={() => remove.mutate(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
