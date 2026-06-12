import { create } from "zustand";

interface UIState {
  // Mobile navigation
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;

  // Search modal
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Auth modal
  authModalOpen: boolean;
  authModalView: "login" | "register" | "forgot";
  openAuthModal: (view?: "login" | "register" | "forgot") => void;
  closeAuthModal: () => void;
  setAuthView: (view: "login" | "register" | "forgot") => void;

  // Quick view
  quickViewProductId: string | null;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

export const useUI = create<UIState>((set) => ({
  // Mobile navigation
  mobileNavOpen: false,
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),

  // Search
  searchOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),

  // Auth modal
  authModalOpen: false,
  authModalView: "login",
  openAuthModal: (view = "login") => set({ authModalOpen: true, authModalView: view }),
  closeAuthModal: () => set({ authModalOpen: false }),
  setAuthView: (view) => set({ authModalView: view }),

  // Quick view
  quickViewProductId: null,
  openQuickView: (productId) => set({ quickViewProductId: productId }),
  closeQuickView: () => set({ quickViewProductId: null }),

  // Toasts
  toasts: [],
  addToast: (toast) =>
    set((s) => ({
      toasts: [...s.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
