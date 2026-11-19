"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { setAccessToken } from "@/lib/api";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

/** Create an account and sign the user in immediately. */
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: ({ token, user }) => {
      setAccessToken(token);
      setUser(user);
      queryClient.invalidateQueries();
      router.push(ROUTES.account);
      router.refresh();
    },
  });
}
