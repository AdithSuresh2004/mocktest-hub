import { attemptStore } from "@/stores/attemptStore";
import { favoriteStore, type FavoriteItem } from "@/stores/favoriteStore";
import { examListStore } from "@/stores/examListStore";
import type { Attempt } from "@/types";
import { createPersistedStore } from "@/stores/createPersistedStore";

interface StreakGoals {
  daily: number;
  weekly: number;
  monthly: number;
}

interface SettingsState {
  notifications: boolean;
  autoSave: boolean;
  streakGoals: StreakGoals;
  setNotifications: (notifications: boolean) => void;
  setAutoSave: (autoSave: boolean) => void;
  setStreakGoals: (streakGoals: StreakGoals) => void;
  exportData: () => void;
  importData: (file: File) => void;
  clearData: () => void;
}

export const settingsStore = createPersistedStore<SettingsState>(
  (set, get) => ({
    notifications: true,
    autoSave: true,
    streakGoals: { daily: 1, weekly: 3, monthly: 12 },

    setNotifications: (notifications) => set({ notifications }),
    setAutoSave: (autoSave) => set({ autoSave }),
    setStreakGoals: (streakGoals) => set({ streakGoals }),

    exportData: () => {
      const { attempts } = attemptStore.getState();
      const { favorites } = favoriteStore.getState();
      const settings = get();

      const data = {
        attempts,
        favorites,
        settings: {
          notifications: settings.notifications,
          autoSave: settings.autoSave,
          streakGoals: settings.streakGoals,
        },
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mocktest-hub-data.json";
      a.click();
      URL.revokeObjectURL(url);
    },

    importData: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const raw: unknown = JSON.parse(e.target?.result as string);
          if (!raw || typeof raw !== "object") return;
          const data = raw as Partial<{
            attempts: Record<string, Attempt>;
            favorites: FavoriteItem[];
            settings: Partial<SettingsState>;
          }>;

          const { setItems } = attemptStore.getState();
          const { setFavorites } = favoriteStore.getState();

          if (data.attempts && typeof data.attempts === "object") {
            setItems(data.attempts);
          }
          if (Array.isArray(data.favorites)) {
            setFavorites(data.favorites);
          }
          if (data.settings && typeof data.settings === "object") {
            set(data.settings);
          }
        } catch {
          return;
        }
      };
      reader.readAsText(file);
    },

    clearData: () => {
      const { setItems } = attemptStore.getState();
      const { setFavorites } = favoriteStore.getState();
      const { clearCustomExams } = examListStore.getState();

      setItems({});
      setFavorites([]);
      clearCustomExams();

      const keysToRemove = [
        "examBuilder_state",
        "attempt-storage",
        "favorite-storage",
        "exam-storage",
        "settings-storage",
        "theme-storage",
        "modal-storage",
        "result-storage",
        "review-storage",
        "toast-storage",
        "global-loading-storage",
      ];

      keysToRemove.forEach((key) => localStorage.removeItem(key));

      localStorage.clear();
    },
  }),
  { name: "settings-storage" },
);
