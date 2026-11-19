import { createService } from "@/services";
import type { Order } from "../types/order.types";

/** Customers can list and view their orders (placing one happens in the checkout feature). */
export const orderService = createService<Order>("/orders");
