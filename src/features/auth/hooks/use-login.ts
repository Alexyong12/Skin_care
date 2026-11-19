"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { setAccessToken } from "@/lib/api";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

/** Only allow same-site redirects (blocks `//evil.com`). */
function safeRedirect(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : ROUTES.account;
}

/** Sign in, store the token, then go back to where the user was heading. */
export function useLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ token, user }) => {
      setAccessToken(token);
      setUser(user);
      queryClient.invalidateQueries();
      router.push(safeRedirect(params.get("redirect")));
      router.refresh();
    },
  });
}
