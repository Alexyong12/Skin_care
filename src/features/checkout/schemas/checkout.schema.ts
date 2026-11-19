import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Enter the recipient's name"),
  phone: z.string().min(6, "Enter a valid phone number"),
  address: z.string().min(5, "Enter the delivery address"),
  city: z.string().min(2, "Enter the city"),
  note: z.string().max(500).optional(),
  paymentMethod: z.enum(["cod", "card", "bank_transfer"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
