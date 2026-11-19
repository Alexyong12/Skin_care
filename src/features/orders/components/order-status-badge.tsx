import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "../types/order.types";

const STATUS: Record<
  OrderStatus,
  { label: string; variant: "default" | "muted" | "accent" | "destructive" }
> = {
  pending: { label: "Pending", variant: "muted" },
  processing: { label: "Processing", variant: "accent" },
  shipped: { label: "Shipped", variant: "default" },
  delivered: { label: "Delivered", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, variant } = STATUS[status] ?? {
    label: status,
    variant: "muted" as const,
  };
  return <Badge variant={variant}>{label}</Badge>;
}
