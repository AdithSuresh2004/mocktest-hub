import { ThemeContextType } from "@/types/components";
import { createPersistedStore } from "@/stores/createPersistedStore";

const applyTheme = (theme: "light" | "dark" | "system") => {
  const root = window.document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(isDark ? "dark" : "light");
};

export const themeStore = createPersistedStore<ThemeContextType>(
  (set) => ({
    theme: "system",
    toggleTheme: (newTheme) => {
      applyTheme(newTheme);
      set({ theme: newTheme });
    },
  }),
  { name: "theme" },
);

export const useTheme = () => {
  const theme = themeStore((s) => s.theme);
  const toggleTheme = themeStore((s) => s.toggleTheme);
  return { theme, toggleTheme };
};
