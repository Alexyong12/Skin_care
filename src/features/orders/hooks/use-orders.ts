"use client";

import { createHooks } from "@/services";
import { orderService } from "../services/order.service";
import type { Order } from "../types/order.types";

const orderHooks = createHooks<Order>("orders", orderService);

export const useOrders = orderHooks.useList;
export const useOrder = orderHooks.useDetail;
export const orderKeys = orderHooks.keys;
