"use client";

import { Menu, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { CartButton } from "@/features/cart";
import { useUiStore } from "@/stores/ui.store";
import { Container } from "./container";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link
            href={ROUTES.home}
            className="text-lg font-semibold tracking-tight text-primary"
          >
            {siteConfig.name}
          </Link>
          <DesktopNav />
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="My account">
            <Link href={ROUTES.account}>
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <CartButton />
        </div>
      </Container>
      <MobileNav />
    </header>
  );
}
