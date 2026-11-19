"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/common/error-message";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { getErrorMessage } from "@/lib/api";
import { useRegister } from "../hooks/use-register";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";

export function RegisterForm() {
  const registerUser = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  return (
    <Card className="mx-auto w-full max-w-md p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Save your routine, track your orders.
      </p>

      <form
        onSubmit={handleSubmit((v) => registerUser.mutate(v))}
        className="mt-6 space-y-4"
        noValidate
      >
        <FormField
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <FormField
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        {registerUser.isError && (
          <ErrorMessage message={getErrorMessage(registerUser.error)} />
        )}
        <Button type="submit" className="w-full" disabled={registerUser.isPending}>
          {registerUser.isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
