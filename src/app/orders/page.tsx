import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { OrderList } from "@/features/orders";

export const metadata: Metadata = { title: "My orders" };

export default function OrdersPage() {
  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-2xl font-semibold sm:text-3xl">My orders</h1>
      <OrderList />
    </Container>
  );
}
