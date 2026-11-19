"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">
        An unexpected error happened. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}
