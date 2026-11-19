import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { CartList } from "@/features/cart";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-2xl font-semibold sm:text-3xl">Your cart</h1>
      <CartList />
    </Container>
  );
}
