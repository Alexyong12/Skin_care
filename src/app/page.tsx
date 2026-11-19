import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { ProductList } from "@/features/products";

export default function HomePage() {
  return (
    <>
      <section className="bg-secondary/60">
        <Container className="flex flex-col items-start gap-6 py-14 sm:py-20 md:mx-0 md:max-w-3xl lg:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Skin care
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Gentle care for every skin type.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Cleansers, serums and moisturizers chosen to keep your routine simple and your
            skin healthy.
          </p>
          <Button asChild size="lg">
            <Link href={ROUTES.products}>Shop all products</Link>
          </Button>
        </Container>
      </section>

      <Container className="py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <Link
            href={ROUTES.products}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <Suspense>
          <ProductList perPage={4} showPagination={false} />
        </Suspense>
      </Container>
    </>
  );
}
