"use client";

import { createHooks } from "@/services";
import { productService } from "../services/product.service";
import type { Product } from "../types/product.types";

const productHooks = createHooks<Product>("products", productService);

/** Paginated, filterable product list. */
export const useProducts = productHooks.useList;
/** One product by id. */
export const useProduct = productHooks.useDetail;
export const productKeys = productHooks.keys;
