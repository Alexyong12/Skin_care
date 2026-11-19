import { ROUTES } from "./routes";

export const siteConfig = {
  name: "Skin Care",
  description: "Gentle, effective skin care for every skin type.",
  navLinks: [
    { label: "Shop", href: ROUTES.products },
    { label: "Orders", href: ROUTES.orders },
  ],
} as const;
