import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  type: string | null;
  props: Record<string, unknown>;
  openModal: (type: string, props?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const modalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  props: {},
  openModal: (type, props = {}) => set({ isOpen: true, type, props }),
  closeModal: () => set({ isOpen: false, type: null, props: {} }),
}));
