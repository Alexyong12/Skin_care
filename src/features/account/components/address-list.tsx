"use client";

import { Trash2 } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/api";
import { useAddresses, useDeleteAddress } from "../hooks/use-account";
import { AddressForm } from "./address-form";

/** Saved addresses + a form to add one. */
export function AddressList() {
  const { data: addresses, isLoading, isError, error, refetch } = useAddresses();
  const remove = useDeleteAddress();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Addresses</h1>

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />
      )}
      {addresses && addresses.length === 0 && (
        <EmptyState
          title="No saved addresses"
          description="Add one below for faster checkout."
        />
      )}
      {addresses && addresses.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {addresses.map((a) => (
            <Card
              key={a.id}
              className="flex items-start justify-between gap-2 p-4 text-sm"
            >
              <div className="min-w-0">
                <p className="font-medium">{a.fullName}</p>
                <p className="text-muted-foreground">{a.line1}</p>
                <p className="text-muted-foreground">{a.city}</p>
                <p className="text-muted-foreground">{a.phone}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Delete address for ${a.fullName}`}
                disabled={remove.isPending}
                onClick={() => remove.mutate(a.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </ul>
      )}

      <Card className="p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Add a new address</h2>
        <AddressForm />
      </Card>
    </div>
  );
}
