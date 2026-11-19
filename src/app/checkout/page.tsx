import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { CheckoutForm } from "@/features/checkout";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-2xl font-semibold sm:text-3xl">Checkout</h1>
      <CheckoutForm />
    </Container>
  );
}
