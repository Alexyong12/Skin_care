"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/common/error-message";
import { FormField } from "@/components/common/form-field";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/api";
import { useProfile, useUpdateProfile } from "../hooks/use-account";
import { profileSchema, type ProfileInput } from "../schemas/account.schema";

export function ProfileForm() {
  const { data: profile, isLoading, isError, error, refetch } = useProfile();
  const update = useUpdateProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInput>({ resolver: zodResolver(profileSchema) });

  // Fill the form once the profile arrives.
  useEffect(() => {
    if (profile) reset({ name: profile.name, phone: profile.phone ?? "" });
  }, [profile, reset]);

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />;

  return (
    <Card className="max-w-xl p-4 sm:p-6">
      <h1 className="text-xl font-semibold">Profile</h1>
      <form
        onSubmit={handleSubmit((v) => update.mutate(v))}
        className="mt-4 space-y-4"
        noValidate
      >
        <FormField label="Email" value={profile?.email ?? ""} readOnly disabled />
        <FormField
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        {update.isError && <ErrorMessage message={getErrorMessage(update.error)} />}
        {update.isSuccess && <p className="text-sm text-primary">Profile saved.</p>}
        <Button type="submit" disabled={update.isPending}>
          {update.isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Card>
  );
}
