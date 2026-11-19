"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { useCart } from "@/features/cart";
import { getErrorMessage } from "@/lib/api";
import { usePlaceOrder } from "../hooks/use-place-order";
import { checkoutSchema, type CheckoutInput } from "../schemas/checkout.schema";
import { OrderReview } from "./order-review";

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on delivery" },
  { value: "card", label: "Credit / debit card" },
  { value: "bank_transfer", label: "Bank transfer" },
] as const;

/** Delivery details + payment method. Form beside the order recap on desktop, stacked on mobile. */
export function CheckoutForm() {
  const { data: cart, isLoading } = useCart();
  const placeOrder = usePlaceOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  if (!isLoading && (!cart || cart.items.length === 0)) {
    return (
      <EmptyState
        title="Nothing to check out"
        description="Add something to your cart first."
        action={
          <Button asChild>
            <Link href={ROUTES.products}>Shop products</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <Card className="min-w-0 flex-1 p-4 sm:p-6">
        <form
          onSubmit={handleSubmit((v) => placeOrder.mutate(v))}
          className="space-y-4"
          noValidate
        >
          <h2 className="text-lg font-semibold">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <FormField
              label="Phone"
              type="tel"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
          <FormField
            label="Address"
            autoComplete="street-address"
            error={errors.address?.message}
            {...register("address")}
          />
          <FormField
            label="City"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />
          <FormField
            label="Note (optional)"
            error={errors.note?.message}
            {...register("note")}
          />

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Payment method</legend>
            {PAYMENT_OPTIONS.map((o) => (
              <label
                key={o.value}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  value={o.value}
                  className="accent-[hsl(var(--primary))]"
                  {...register("paymentMethod")}
                />
                {o.label}
              </label>
            ))}
          </fieldset>

          {placeOrder.isError && (
            <ErrorMessage message={getErrorMessage(placeOrder.error)} />
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={placeOrder.isPending}
          >
            {placeOrder.isPending ? "Placing order..." : "Place order"}
          </Button>
        </form>
      </Card>
      <div className="lg:w-96 lg:shrink-0">
        <OrderReview />
      </div>
    </div>
  );
}
