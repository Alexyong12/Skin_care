import { create } from "zustand";

/** Pure UI state (never server data). */
interface UiState {
  mobileMenuOpen: boolean;
  cartOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  cartOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setCartOpen: (cartOpen) => set({ cartOpen }),
}));
