"use client";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { Loader } from "@/components/common/loader";
import { Badge } from "@/components/ui/badge";
import { isApiError, getErrorMessage } from "@/lib/api";
import { AddToCartButton } from "@/features/cart";
import { useProduct } from "../hooks/use-products";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";

export function ProductDetail({ id }: { id: string }) {
  const { data: product, isLoading, isError, error, refetch } = useProduct(id);

  if (isLoading) return <Loader />;
  if (isError) {
    if (isApiError(error) && error.status === 404) {
      return (
        <EmptyState title="Product not found" description="It may have been removed." />
      );
    }
    return <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />;
  }
  if (!product) return null;

  const soldOut = product.stock <= 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <ProductImage src={product.image} alt={product.name} />
      <div className="space-y-4">
        {product.brand && (
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
        )}
        <h1 className="text-2xl font-semibold sm:text-3xl">{product.name}</h1>
        <div className="text-xl">
          <ProductPrice product={product} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent" className="capitalize">
            {product.category}
          </Badge>
          {product.skinTypes?.map((t) => (
            <Badge key={t} variant="muted" className="capitalize">
              {t}
            </Badge>
          ))}
        </div>
        <p className="leading-relaxed text-muted-foreground">{product.description}</p>
        {soldOut ? (
          <Badge variant="destructive">Sold out</Badge>
        ) : (
          <AddToCartButton
            productId={product.id}
            size="lg"
            className="w-full sm:w-auto"
          />
        )}
      </div>
    </div>
  );
}
