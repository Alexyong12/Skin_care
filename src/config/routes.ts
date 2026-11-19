/** Single source of truth for URLs. Never hardcode paths in components. */
export const ROUTES = {
  home: "/",
  products: "/products",
  product: (id: string | number) => `/products/${id}`,
  cart: "/cart",
  checkout: "/checkout",
  orders: "/orders",
  order: (id: string | number) => `/orders/${id}`,
  account: "/account",
  addresses: "/account/addresses",
  security: "/account/security",
  login: "/login",
  register: "/register",
} as const;

/** Pages that need a signed-in customer (enforced in middleware.ts). */
export const PROTECTED_ROUTES = [ROUTES.account, ROUTES.orders, ROUTES.checkout] as const;

/** Pages a signed-in customer does not need to see again. */
export const AUTH_ROUTES = [ROUTES.login, ROUTES.register] as const;
