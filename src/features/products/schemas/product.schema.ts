import { z } from "zod";

/** Runtime check for product data coming from the network (use in a service adapter if needed). */
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number().nullish(),
  image: z.string().nullish(),
  category: z.string(),
  brand: z.string().optional(),
  skinTypes: z.array(z.string()).optional(),
  rating: z.number().optional(),
  stock: z.number(),
});
