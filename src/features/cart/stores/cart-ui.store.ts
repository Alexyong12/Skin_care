// Cart drawer open/close lives in the global ui store so the header and the
// "added to cart" flow share it. Re-exported here as this feature's UI-state entry point.
export { useUiStore as useCartUiStore } from "@/stores/ui.store";
