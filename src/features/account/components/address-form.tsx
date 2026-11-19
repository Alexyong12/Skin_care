"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/common/error-message";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/api";
import { useCreateAddress } from "../hooks/use-account";
import { addressSchema, type AddressInput } from "../schemas/account.schema";

export function AddressForm() {
  const create = useCreateAddress();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressInput>({ resolver: zodResolver(addressSchema) });

  return (
    <form
      onSubmit={handleSubmit((v) => create.mutate(v, { onSuccess: () => reset() }))}
      className="space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormField
          label="Phone"
          type="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>
      <FormField label="Address" error={errors.line1?.message} {...register("line1")} />
      <FormField label="City" error={errors.city?.message} {...register("city")} />
      {create.isError && <ErrorMessage message={getErrorMessage(create.error)} />}
      <Button type="submit" disabled={create.isPending}>
        {create.isPending ? "Saving..." : "Add address"}
      </Button>
    </form>
  );
}
