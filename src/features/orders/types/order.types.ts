export type OrderStatus =
  "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
}

export interface Order {
  id: string;
  /** Human-friendly order number, e.g. "SC-10024". Falls back to id. */
  code?: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items?: OrderItem[];
  shippingAddress?: string;
  paymentMethod?: string;
}
