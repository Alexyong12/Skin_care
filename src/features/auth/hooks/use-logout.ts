"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { clearAccessToken } from "@/lib/api";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

/** Sign out. Local cleanup always happens, even if the server call fails. */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: () => authService.logout().catch(() => undefined),
    onSettled: () => {
      clearAccessToken();
      setUser(null);
      queryClient.clear();
      router.push(ROUTES.login);
      router.refresh();
    },
  });
}
