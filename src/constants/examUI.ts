export const EXAM_TIMER_STYLES = {
  critical:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse ring-2 ring-red-500",
  warning:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500",
  normal: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
} as const;

export const EXAM_BUTTON_STYLES = {
  header:
    "rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700",
  exit: "rounded-md p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400",
} as const;

export const EXAM_QUESTION_STYLES = {
  loading:
    "flex flex-1 items-center justify-center bg-gray-50 p-8 transition-colors duration-200 dark:bg-gray-900",
  option: {
    selected:
      "border-blue-500 bg-blue-100 shadow-md dark:border-blue-400 dark:bg-blue-900/50",
    unselected:
      "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700",
    circle: {
      selected: "border-blue-500 bg-blue-500 text-white",
      unselected:
        "border-gray-400 text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500 dark:border-gray-600 dark:text-gray-400",
    },
  },
} as const;

export const EXAM_TIME_THRESHOLDS = {
  critical: 60,
  warning: 300,
} as const;

export const EXAM_LOADING_STATE = {
  text: "Loading question...",
  container: "flex h-screen items-center justify-center",
} as const;
