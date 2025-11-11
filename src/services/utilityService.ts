import { formatTime } from "@/utils/formatters";
import { debounce } from "@/utils/performance/debounce";

export { formatTime, debounce };

export const getTimeAgo = (date: string | Date): string => {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

export const deepClone = <T>(obj: T): T => structuredClone(obj);

export const generateId = (prefix = ""): string =>
  `${prefix}${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
