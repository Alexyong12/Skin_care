"use client";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { Loader } from "@/components/common/loader";
import { Card } from "@/components/ui/card";
import { getErrorMessage, isApiError } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { useOrder } from "../hooks/use-orders";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderDetail({ id }: { id: string }) {
  const { data: order, isLoading, isError, error, refetch } = useOrder(id);

  if (isLoading) return <Loader />;
  if (isError) {
    if (isApiError(error) && error.status === 404)
      return <EmptyState title="Order not found" />;
    return <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />;
  }
  if (!order) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Order {order.code ?? order.id}</h1>
          <p className="text-sm text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <Card className="divide-y">
        {order.items?.map((item) => (
          <div key={item.id} className="flex justify-between gap-4 p-4 text-sm">
            <span className="min-w-0 truncate">
              {item.name}{" "}
              <span className="text-muted-foreground">&times; {item.quantity}</span>
            </span>
            <span className="shrink-0">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between p-4 font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </Card>

      {order.shippingAddress && (
        <Card className="p-4 text-sm">
          <h2 className="mb-1 font-semibold">Delivery address</h2>
          <p className="text-muted-foreground">{order.shippingAddress}</p>
        </Card>
      )}
    </div>
  );
}
