"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createQueryClient } from "./client";

export function QueryProvider({ children }: { children: ReactNode }) {
  // useState keeps one client per browser session (not recreated on re-render).
  const [client] = useState(createQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
