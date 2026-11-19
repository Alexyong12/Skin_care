import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3 pt-6">
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {lastPage}
      </span>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={page >= lastPage}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
