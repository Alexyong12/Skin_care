import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { ProductFilters, ProductList } from "@/features/products";

export const metadata: Metadata = { title: "Shop" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = Number(first(sp.page));

  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-2xl font-semibold sm:text-3xl">Shop</h1>
      <Suspense>
        <ProductFilters />
        <ProductList
          filters={{
            search: first(sp.search),
            category: first(sp.category),
            skinType: first(sp.skinType),
            page: Number.isFinite(page) && page > 0 ? page : 1,
          }}
        />
      </Suspense>
    </Container>
  );
}
