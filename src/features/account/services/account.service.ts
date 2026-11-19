import { apiClient, type ApiResponse } from "@/lib/api";
import type {
  AddressInput,
  ChangePasswordInput,
  ProfileInput,
} from "../schemas/account.schema";
import type { Address, Profile } from "../types/account.types";

export const accountService = {
  getProfile: async () =>
    (await apiClient.get<ApiResponse<Profile>>("/account/profile")).data,

  updateProfile: async (body: ProfileInput) =>
    (await apiClient.put<ApiResponse<Profile>>("/account/profile", body)).data,

  listAddresses: async () =>
    (await apiClient.get<ApiResponse<Address[]>>("/account/addresses")).data,

  createAddress: async (body: AddressInput) =>
    (await apiClient.post<ApiResponse<Address>>("/account/addresses", body)).data,

  deleteAddress: async (id: string) => {
    await apiClient.delete<void>(`/account/addresses/${id}`);
  },

  changePassword: async ({ confirmPassword: _confirm, ...body }: ChangePasswordInput) => {
    await apiClient.post<void>("/account/change-password", body);
  },
};
