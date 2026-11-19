"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { useLogout } from "@/features/auth";
import { cn } from "@/lib/utils/cn";

const items = [
  { label: "Profile", href: ROUTES.account },
  { label: "Addresses", href: ROUTES.addresses },
  { label: "Security", href: ROUTES.security },
  { label: "Orders", href: ROUTES.orders },
];

/** Account navigation: scrollable tabs below lg, vertical sidebar on lg+. */
export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <aside className="lg:w-60 lg:shrink-0">
      <nav
        aria-label="Account"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 shrink-0 items-center rounded-md px-4 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Button
          variant="ghost"
          className="shrink-0 justify-start text-muted-foreground"
          onClick={() => logout.mutate()}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </nav>
    </aside>
  );
}
