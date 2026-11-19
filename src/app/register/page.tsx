import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <Container className="py-10 sm:py-16">
      <RegisterForm />
    </Container>
  );
}
