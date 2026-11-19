import { CURRENCY } from "@/config/constants";

/** Format a number as money, e.g. 12.5 -> "$12.50". */
export function formatCurrency(amount: number, currency: string = CURRENCY) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

/** Format an ISO date string, e.g. "12 Nov 2026". */
export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
