import { create } from "zustand";

type UIState = {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  yumiOpen: boolean;
  /** Mirrors next-themes value; useful for components that need it without re-reading localStorage */
  theme: "light" | "dark" | "system";

  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;

  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;

  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;

  setYumiOpen: (open: boolean) => void;
  toggleYumi: () => void;

  setTheme: (theme: UIState["theme"]) => void;
};

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  yumiOpen: false,
  theme: "system",

  setCartOpen: (cartOpen) => set({ cartOpen }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),

  setSearchOpen: (searchOpen) => set({ searchOpen }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),

  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),

  setYumiOpen: (yumiOpen) => set({ yumiOpen }),
  toggleYumi: () => set((s) => ({ yumiOpen: !s.yumiOpen })),

  setTheme: (theme) => set({ theme }),
}));
