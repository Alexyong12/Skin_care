import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "@/config/constants";

export const profileSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().optional(),
});

export const addressSchema = z.object({
  fullName: z.string().min(2, "Enter the recipient's name"),
  phone: z.string().min(6, "Enter a valid phone number"),
  line1: z.string().min(5, "Enter the address"),
  city: z.string().min(2, "Enter the city"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `At least ${MIN_PASSWORD_LENGTH} characters`),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ProfileInput = z.infer<typeof profileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
