"use client";

import Link from "next/link";
import { Sheet } from "@/components/ui/sheet";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { useUiStore } from "@/stores/ui.store";

/** Drawer menu for mobile (below md). */
export function MobileNav() {
  const open = useUiStore((s) => s.mobileMenuOpen);
  const setOpen = useUiStore((s) => s.setMobileMenuOpen);
  const close = () => setOpen(false);

  const links = [
    ...siteConfig.navLinks,
    { label: "Cart", href: ROUTES.cart },
    { label: "My account", href: ROUTES.account },
  ];

  return (
    <Sheet open={open} onClose={close} title="Menu" side="left">
      <nav aria-label="Mobile" className="flex flex-col p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="flex min-h-11 items-center rounded-md px-3 text-base font-medium hover:bg-muted"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </Sheet>
  );
}
