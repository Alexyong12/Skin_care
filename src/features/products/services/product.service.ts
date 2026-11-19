import { createService } from "@/services";
import type { Product } from "../types/product.types";

/**
 * Standard CRUD for /products (list, get, ...) from the shared engine.
 * Add product-specific endpoints next to it, e.g.:
 *   getFeatured: () => apiClient.get<Product[]>("/products/featured")
 */
export const productService = createService<Product>("/products");
