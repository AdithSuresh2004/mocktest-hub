const pad = (num: number): string => num.toString().padStart(2, "0");

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "Invalid Date";
  const d = new Date(date);
  return isNaN(d.getTime())
    ? "Invalid Date"
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

export const formatTime = (seconds: number | undefined): string => {
  if (seconds === undefined || seconds === null || isNaN(seconds))
    return "00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export const formatDuration = (seconds: number | undefined): string => {
  if (!seconds || isNaN(seconds)) return "0s";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
};

export const capitalizeText = (
  text: string | undefined,
  defaultValue: string = "",
): string =>
  text
    ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    : defaultValue;
