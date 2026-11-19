import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Sidebar } from "@/components/layout/sidebar";

/** Tabs on mobile/tablet, sidebar on desktop. */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Container>
  );
}
