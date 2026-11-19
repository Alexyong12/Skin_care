import { Container } from "@/components/layout/container";
import { OrderDetail } from "@/features/orders";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Container className="py-8">
      <OrderDetail id={id} />
    </Container>
  );
}
