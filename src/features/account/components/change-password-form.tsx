"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/common/error-message";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/api";
import { useChangePassword } from "../hooks/use-account";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "../schemas/account.schema";

export function ChangePasswordForm() {
  const change = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({ resolver: zodResolver(changePasswordSchema) });

  return (
    <Card className="max-w-xl p-4 sm:p-6">
      <h1 className="text-xl font-semibold">Security</h1>
      <p className="mt-1 text-sm text-muted-foreground">Change your password.</p>
      <form
        onSubmit={handleSubmit((v) => change.mutate(v, { onSuccess: () => reset() }))}
        className="mt-4 space-y-4"
        noValidate
      >
        <FormField
          label="Current password"
          type="password"
          autoComplete="current-password"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />
        <FormField
          label="New password"
          type="password"
          autoComplete="new-password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <FormField
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        {change.isError && <ErrorMessage message={getErrorMessage(change.error)} />}
        {change.isSuccess && <p className="text-sm text-primary">Password updated.</p>}
        <Button type="submit" disabled={change.isPending}>
          {change.isPending ? "Updating..." : "Update password"}
        </Button>
      </form>
    </Card>
  );
}
