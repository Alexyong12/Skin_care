"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { Pagination } from "@/components/common/pagination";
import { getErrorMessage } from "@/lib/api";
import { useProducts } from "../hooks/use-products";
import { PRODUCTS_PER_PAGE } from "../constants/product.constants";
import type { ProductFilters } from "../types/product.types";
import { ProductCard } from "./product-card";
import { ProductListSkeleton } from "./product-list-skeleton";

interface ProductListProps {
  filters?: ProductFilters;
  perPage?: number;
  /** Hide pagination for small "featured" strips. */
  showPagination?: boolean;
}

/** Container: owns data + loading/error states, delegates pixels to ProductCard. */
export function ProductList({
  filters = {},
  perPage = PRODUCTS_PER_PAGE,
  showPagination = true,
}: ProductListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = filters.page ?? 1;

  const { data, isLoading, isError, error, refetch } = useProducts({
    page,
    perPage,
    search: filters.search,
    category: filters.category,
    skinType: filters.skinType,
  });

  const goToPage = (next: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(next));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) return <ProductListSkeleton count={Math.min(perPage, 8)} />;
  if (isError)
    return <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />;
  if (!data || data.data.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try changing your filters or search."
      />
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      {showPagination && (
        <Pagination
          page={data.meta.page}
          lastPage={data.meta.lastPage}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
