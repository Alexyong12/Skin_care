export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Discounted price, when on sale. */
  salePrice?: number | null;
  image?: string | null;
  category: string;
  brand?: string;
  skinTypes?: string[];
  rating?: number;
  stock: number;
}

/** Filters that live in the URL (?category=serum&skinType=oily&search=...&page=2). */
export interface ProductFilters {
  search?: string;
  category?: string;
  skinType?: string;
  page?: number;
}
