import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Horizontal links, visible from md up (mobile uses MobileNav). */
export function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
      {siteConfig.navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
