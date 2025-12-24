// Math utilities
export const sum = (nums: number[]): number =>
  nums.reduce((a, b) => a + (b || 0), 0);

export const calculatePercentage = (
  part: number,
  total: number,
  decimals: number = 0,
): number => {
  if (!total) return 0;
  const pct = (part / total) * 100;
  return decimals > 0 ? Number(pct.toFixed(decimals)) : Math.round(pct);
};

export const calculateAccuracy = (
  correct: number,
  attempted: number,
  decimals = 1,
) => calculatePercentage(correct, attempted, decimals);

export const toNumber = (
  v: number | string | { actual?: number; total?: number } | undefined,
): number => {
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if ("actual" in v && typeof v.actual === "number") return v.actual;
    if ("total" in v && typeof v.total === "number") return v.total;
  }
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// Array utilities
export const toMap = <T, K extends string | number>(
  arr: T[],
  fn: (item: T) => K,
): Record<K, T> =>
  arr.reduce((map, item) => ({ ...map, [fn(item)]: item }), {} as Record<K, T>);

export const countBy = <T>(items: T[], pred: (item: T) => boolean): number =>
  items.filter(pred).length;

// Date utilities
const toDate = (date: Date | string) => new Date(date);

export const getDateKey = (date: Date | string) =>
  toDate(date).toISOString().split("T")[0];

const setTime = (date: Date, hours: number, mins: number, secs: number) => {
  const d = new Date(date);
  d.setHours(hours, mins, secs, 0);
  return d;
};

export const getStartOfDay = (date: Date = new Date()) =>
  setTime(date, 0, 0, 0);

export const getStartOfWeek = (date: Date = new Date()) => {
  const d = getStartOfDay(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
};

export const getStartOfMonth = (date: Date = new Date()) =>
  setTime(new Date(date.getFullYear(), date.getMonth(), 1), 0, 0, 0);

// State utilities
export const createErrorState = (errorMessage: string) => ({
  error: errorMessage,
  loading: false,
});

export const createLoadingState = () => ({ error: null, loading: true });
