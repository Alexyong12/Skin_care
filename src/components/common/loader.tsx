import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex justify-center py-10", className)}
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}
