import { Container } from "@/components/layout/container";
import { ProductDetail } from "@/features/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Container className="py-8">
      <ProductDetail id={id} />
    </Container>
  );
}
