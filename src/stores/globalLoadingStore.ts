import { create } from "zustand";

interface GlobalLoadingState {
  count: number;
  message?: string | null;
  show: (message?: string) => void;
  hide: () => void;
  withLoading: <T>(fn: () => Promise<T>, message?: string) => Promise<T>;
}

export const globalLoadingStore = create<GlobalLoadingState>((set, get) => ({
  count: 0,
  message: null,
  show: (message) =>
    set((s) => ({ count: s.count + 1, message: message ?? s.message })),
  hide: () =>
    set((s) => ({
      count: Math.max(0, s.count - 1),
      message: s.count - 1 > 0 ? s.message : null,
    })),
  withLoading: async (fn, message) => {
    const { show, hide } = get();
    try {
      show(message);
      return await fn();
    } finally {
      hide();
    }
  },
}));
