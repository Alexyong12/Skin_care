import { apiClient, type ApiResponse } from "@/lib/api";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";
import type { AuthResponse, AuthUser } from "../types/auth.types";

export const authService = {
  /** Sign in. Returns the access token and the user. */
  login: async (body: LoginInput) =>
    (
      await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", body, {
        skipAuth: true,
      })
    ).data,

  register: async ({ confirmPassword: _confirm, ...body }: RegisterInput) =>
    (
      await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", body, {
        skipAuth: true,
      })
    ).data,

  logout: () => apiClient.post<void>("/auth/logout"),

  me: async () => (await apiClient.get<ApiResponse<AuthUser>>("/auth/me")).data,
};
