import { formatCurrency } from "@/lib/utils/format";
import type { Product } from "../types/product.types";

export function ProductPrice({
  product,
}: {
  product: Pick<Product, "price" | "salePrice">;
}) {
  const onSale = product.salePrice != null && product.salePrice < product.price;
  return (
    <p className="flex items-baseline gap-2">
      <span className="font-semibold">
        {formatCurrency(onSale ? (product.salePrice as number) : product.price)}
      </span>
      {onSale && (
        <span className="text-sm text-muted-foreground line-through">
          {formatCurrency(product.price)}
        </span>
      )}
    </p>
  );
}
