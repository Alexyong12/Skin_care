"use client";

import { BREAKPOINTS, type Breakpoint } from "@/config/breakpoints";
import { useMediaQuery } from "./use-media-query";

/** 'mobile' (< md) | 'tablet' (md to lg) | 'desktop' (lg+). Prefer Tailwind classes for styling. */
export function useBreakpoint(): Breakpoint {
  const isTabletUp = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isDesktopUp = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  if (isDesktopUp) return "desktop";
  if (isTabletUp) return "tablet";
  return "mobile";
}
