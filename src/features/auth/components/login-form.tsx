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
import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <Card className="mx-auto w-full max-w-md p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to see your orders and cart.
      </p>

      <form
        onSubmit={handleSubmit((v) => login.mutate(v))}
        className="mt-6 space-y-4"
        noValidate
      >
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
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        {login.isError && <ErrorMessage message={getErrorMessage(login.error)} />}
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link href={ROUTES.register} className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
