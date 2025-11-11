export const KEYBOARD = {
  PREV: ["ArrowLeft", "←"],
  NEXT: ["ArrowRight", "→"],
  SELECT_1: "1",
  SELECT_2: "2",
  SELECT_3: "3",
  SELECT_4: "4",
  MARK: ["m", "M"],
  FULLSCREEN: ["f", "F"],
  ESCAPE: "Escape",
} as const;

export const isKeyInShortcuts = (
  key: string,
  shortcuts: readonly string[] | string,
): boolean =>
  Array.isArray(shortcuts) ? shortcuts.includes(key) : shortcuts === key;

export const getOptionFromKey = (key: string): number | null => {
  const idx = ["1", "2", "3", "4"].indexOf(key);
  return idx >= 0 ? idx : null;
};

export const STORAGE = {
  FAVORITES: "favorites",
  ATTEMPTS: "exam_attempts",
  SETTINGS: "settings",
  THEME: "theme",
  SOURCES: "exam_sources",
  MANIFEST: "local_exams_manifest",
} as const;

export const CACHE_DURATION = {
  MANIFEST: 5 * 60 * 1000,
  EXAM: 10 * 60 * 1000,
} as const;

export const THEME_CLASSES = {
  button: {
    primary:
      "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200",
    danger:
      "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white",
    success:
      "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white",
    text: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
    ghost:
      "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
    outline:
      "border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800",
  },
  focus: "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
  text: {
    primary: "text-gray-900 dark:text-gray-100",
    secondary: "text-gray-600 dark:text-gray-400",
  },
  card: {
    base: "rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800",
    interactive:
      "rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
    section:
      "rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800",
  },
} as const;
