export const COLOR_PALETTE = {
  status: {
    answered: "bg-green-500 dark:bg-green-600",
    "not-answered": "bg-gray-300 dark:bg-gray-600",
    "marked-for-review": "bg-yellow-500 dark:bg-yellow-600",
    "answered-marked": "bg-purple-500 dark:bg-purple-600",
  },
  difficulty: {
    easy: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    hard: "text-red-600 dark:text-red-400",
  },
  category: {
    nimcet: "text-blue-600 dark:text-blue-400",
    cuetmca: "text-purple-600 dark:text-purple-400",
    gate: "text-green-600 dark:text-green-400",
  },
  performance: {
    excellent: "text-green-600 dark:text-green-400",
    good: "text-blue-600 dark:text-blue-400",
    average: "text-yellow-600 dark:text-yellow-400",
    poor: "text-red-600 dark:text-red-400",
  },
} as const;

export const DEFAULT_COLORS = {
  status: "bg-gray-300 dark:bg-gray-600",
  difficulty: "text-gray-600 dark:text-gray-400",
  category: "text-gray-600 dark:text-gray-400",
  performance: "text-gray-600 dark:text-gray-400",
} as const;

export const getColorFromPalette = <T extends keyof typeof COLOR_PALETTE>(
  type: T,
  key?: string,
): string => {
  const palette = COLOR_PALETTE[type] as Record<string, string>;
  return palette[key?.toLowerCase() || ""] || DEFAULT_COLORS[type];
};
