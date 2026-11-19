// PUBLIC API of the products feature. Import from "@/features/products" only.
export { ProductDetail } from "./components/product-detail";
export { ProductFilters } from "./components/product-filters";
export { ProductList } from "./components/product-list";
export { useProduct, useProducts, productKeys } from "./hooks/use-products";
export type {
  Product,
  ProductFilters as ProductFiltersState,
} from "./types/product.types";
