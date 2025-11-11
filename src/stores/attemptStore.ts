import type { Attempt } from "@/types";
import { getExamAttemptStatus } from "@/services/filterService";
import { createPersistedStore } from "@/stores/createPersistedStore";

interface AttemptState {
  attempts: Record<string, Attempt>;
  addItem: (item: Attempt) => void;
  updateItem: (id: string, item: Attempt) => void;
  removeItem: (id: string) => void;
  setItems: (items: Record<string, Attempt>) => void;
  getItem: (id: string) => Attempt | undefined;
  addAttempt: (attempt: Attempt) => void;
  updateAttempt: (id: string, attempt: Attempt) => void;
  removeAttempt: (id: string) => void;
  setAttempts: (attempts: Record<string, Attempt>) => void;
  getAttempt: (id: string) => Attempt | undefined;
  getAttemptStatus: (examId: string) => string;
}

export const attemptStore = createPersistedStore<AttemptState>(
  (set, get) => ({
    attempts: {},
    addItem: (item) =>
      set({ attempts: { ...get().attempts, [item.id]: item } }),
    updateItem: (id, item) =>
      set({ attempts: { ...get().attempts, [id]: item } }),
    removeItem: (id) => {
      const rest = Object.fromEntries(
        Object.entries(get().attempts).filter(([key]) => key !== id),
      );
      set({ attempts: rest });
    },
    setItems: (items) => set({ attempts: items }),
    getItem: (id) => get().attempts[id],
    addAttempt: (attempt) => get().addItem(attempt),
    updateAttempt: (id, attempt) => get().updateItem(id, attempt),
    removeAttempt: (id) => get().removeItem(id),
    setAttempts: (attempts) => get().setItems(attempts),
    getAttempt: (id) => get().getItem(id),
    getAttemptStatus: (examId) => {
      const examAttempts = Object.values(get().attempts).filter(
        (a) => a.exam_id === examId,
      );
      return getExamAttemptStatus(examAttempts);
    },
  }),
  { name: "attempt-storage" },
);
