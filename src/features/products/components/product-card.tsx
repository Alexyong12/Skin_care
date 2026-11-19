import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/routes";
import { AddToCartButton } from "@/features/cart";
import type { Product } from "../types/product.types";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";

/** Presentational card: receives a product, renders it, never fetches. */
export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;
  return (
    <li className="flex flex-col gap-3">
      <Link href={ROUTES.product(product.id)} className="group block space-y-3">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="transition-transform group-hover:scale-[1.02]"
        />
        <div className="space-y-1">
          {product.brand && (
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
          )}
          <h3 className="line-clamp-2 font-medium">{product.name}</h3>
          <ProductPrice product={product} />
        </div>
      </Link>
      {soldOut ? (
        <Badge variant="muted" className="self-start">
          Sold out
        </Badge>
      ) : (
        <AddToCartButton productId={product.id} variant="outline" className="w-full" />
      )}
    </li>
  );
}
