"use client";

import { useEffect, useState } from "react";

/** Returns `value` only after it stopped changing for `delay` ms (e.g. search input). */
export function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
