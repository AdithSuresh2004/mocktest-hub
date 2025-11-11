export const PERFORMANCE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  AVERAGE: 40,
} as const;

export const PERFORMANCE_COLORS = {
  EXCELLENT: "text-green-600 dark:text-green-400",
  GOOD: "text-blue-600 dark:text-blue-400",
  AVERAGE: "text-yellow-600 dark:text-yellow-400",
  POOR: "text-red-600 dark:text-red-400",
} as const;

export const STREAK_GOALS = {
  DAILY: 3,
  WEEKLY: 15,
  MONTHLY: 60,
} as const;

export const DASHBOARD_LIMITS = {
  RECENT_ACTIVITY_COUNT: 4,
  MAX_VISIBLE_ACTIVITIES: 4,
} as const;
