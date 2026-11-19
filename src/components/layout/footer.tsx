import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-secondary/50">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href={ROUTES.products} className="hover:text-foreground">
            Shop
          </Link>
          <Link href={ROUTES.orders} className="hover:text-foreground">
            Orders
          </Link>
          <Link href={ROUTES.account} className="hover:text-foreground">
            Account
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
