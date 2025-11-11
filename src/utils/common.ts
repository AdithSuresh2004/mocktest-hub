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

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export const isEmpty = (v: unknown): boolean => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim().length === 0;
  if (Array.isArray(v)) return v.length === 0;
  return typeof v === "object" && Object.keys(v).length === 0;
};

export const safeParseInt = (
  v: string | number | undefined,
  def = 0,
): number => {
  if (typeof v === "number") return Math.floor(v);
  if (!v) return def;
  const p = parseInt(v, 10);
  return isNaN(p) ? def : p;
};

export const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const uniqueBy = <T, K>(arr: T[], fn: (item: T) => K): T[] => {
  const seen = new Set<K>();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const groupBy = <T, K extends string | number>(
  arr: T[],
  fn: (item: T) => K,
): Record<K, T[]> =>
  arr.reduce(
    (groups, item) => {
      const key = fn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );

export const toMap = <T, K extends string | number>(
  arr: T[],
  fn: (item: T) => K,
): Record<K, T> =>
  arr.reduce((map, item) => ({ ...map, [fn(item)]: item }), {} as Record<K, T>);

export const sortBy = <T>(
  arr: T[],
  fn: (item: T) => number | string,
  order: "asc" | "desc" = "asc",
): T[] =>
  [...arr].sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    return order === "asc"
      ? aVal < bVal
        ? -1
        : aVal > bVal
          ? 1
          : 0
      : aVal > bVal
        ? -1
        : aVal < bVal
          ? 1
          : 0;
  });

export const countBy = <T>(items: T[], pred: (item: T) => boolean): number =>
  items.filter(pred).length;

const toDate = (date: Date | string) => new Date(date);

export const getDateKey = (date: Date | string) =>
  toDate(date).toISOString().split("T")[0];

export const isSameDay = (date1: Date | string, date2: Date | string) =>
  getDateKey(date1) === getDateKey(date2);

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

export const getDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return getStartOfDay(d);
};

export const createErrorState = (errorMessage: string) => ({
  error: errorMessage,
  loading: false,
});

export const createLoadingState = () => ({ error: null, loading: true });
export const createSuccessState = () => ({ error: null, loading: false });

export const safeAsync = async <T>(
  fn: () => Promise<T>,
  errorMessage = "An error occurred",
): Promise<{ data: T | null; error: string | null }> => {
  try {
    return { data: await fn(), error: null };
  } catch (err) {
    console.error(errorMessage, err);
    return { data: null, error: errorMessage };
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000,
): Promise<T> => {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayMs * (attempt + 1)),
        );
      }
    }
  }
  throw lastError || new Error("Max retries exceeded");
};

export const shimmer = (w: number, h: number): string =>
  `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="g"><stop offset="20%" stop-color="#f0f0f0"/><stop offset="50%" stop-color="#e0e0e0"/><stop offset="80%" stop-color="#f0f0f0"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#f0f0f0"/><rect id="r" width="${w}" height="${h}" fill="url(#g)" x="0" y="0"/><animate attributeName="x" from="-${w}" to="${w}" dur="1s" repeat="indefinite"/></svg>`;
