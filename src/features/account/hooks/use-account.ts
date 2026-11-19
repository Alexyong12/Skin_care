"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/account.service";

export const accountKeys = {
  profile: ["account", "profile"] as const,
  addresses: ["account", "addresses"] as const,
};

export const useProfile = () =>
  useQuery({ queryKey: accountKeys.profile, queryFn: accountService.getProfile });

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.updateProfile,
    onSuccess: (profile) => queryClient.setQueryData(accountKeys.profile, profile),
  });
}

export const useAddresses = () =>
  useQuery({ queryKey: accountKeys.addresses, queryFn: accountService.listAddresses });

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.createAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: accountKeys.addresses }),
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.deleteAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: accountKeys.addresses }),
  });
}

export const useChangePassword = () =>
  useMutation({ mutationFn: accountService.changePassword });
