"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { PRODUCT_CATEGORIES, SKIN_TYPES } from "../constants/product.constants";

const selectClass =
  "h-11 w-full rounded-md border border-input bg-card px-3 text-base capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm";

/** Search + category + skin type. State lives in the URL so results are shareable. */
export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search);

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // any filter change starts from page 1
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get("search") ?? ""))
      update("search", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="pl-9"
        />
      </div>
      <select
        aria-label="Category"
        className={selectClass}
        value={searchParams.get("category") ?? ""}
        onChange={(e) => update("category", e.target.value)}
      >
        <option value="">All categories</option>
        {PRODUCT_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        aria-label="Skin type"
        className={selectClass}
        value={searchParams.get("skinType") ?? ""}
        onChange={(e) => update("skinType", e.target.value)}
      >
        <option value="">All skin types</option>
        {SKIN_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
