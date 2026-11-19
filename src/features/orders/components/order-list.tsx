"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { Loader } from "@/components/common/loader";
import { Pagination } from "@/components/common/pagination";
import { ResponsiveTable, type Column } from "@/components/common/responsive-table";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { getErrorMessage } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { useOrders } from "../hooks/use-orders";
import type { Order } from "../types/order.types";
import { OrderStatusBadge } from "./order-status-badge";

const columns: Column<Order>[] = [
  {
    key: "code",
    header: "Order",
    cell: (o) => <span className="font-medium">{o.code ?? o.id}</span>,
  },
  { key: "date", header: "Date", cell: (o) => formatDate(o.createdAt) },
  {
    key: "status",
    header: "Status",
    cell: (o) => <OrderStatusBadge status={o.status} />,
  },
  {
    key: "total",
    header: "Total",
    cell: (o) => formatCurrency(o.total),
    className: "md:text-right",
  },
  {
    key: "view",
    header: "",
    className: "md:text-right",
    cell: (o) => (
      <Button asChild variant="outline" size="sm">
        <Link href={ROUTES.order(o.id)}>View</Link>
      </Button>
    ),
  },
];

/** Order history: table on tablet/desktop, cards on mobile. */
export function OrderList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useOrders({ page, perPage: 10 });

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message={getErrorMessage(error)} onRetry={() => refetch()} />;
  if (!data || data.data.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="When you place an order it will show up here."
        action={
          <Button asChild>
            <Link href={ROUTES.products}>Start shopping</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <ResponsiveTable columns={columns} rows={data.data} getRowKey={(o) => o.id} />
      <Pagination
        page={data.meta.page}
        lastPage={data.meta.lastPage}
        onPageChange={setPage}
      />
    </div>
  );
}
