import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Container className="py-10 sm:py-16">
      {/* LoginForm reads ?redirect= from the URL, which needs a Suspense boundary. */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </Container>
  );
}
