import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/** Responsive max-width + side padding (see `container` in tailwind.config.ts). */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container", className)} {...props} />;
}
