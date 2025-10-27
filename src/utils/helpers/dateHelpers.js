/**
 * Centralized date and time helper functions
 * Eliminates duplication across the codebase
 */

/**
 * Get date key for streak calculations
 */
export const getDateKey = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/**
 * Check if two dates are on the same day
 */
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

/**
 * Get start of day timestamp
 */
export const getStartOfDay = (date = new Date()) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Get start of week timestamp
 */
export const getStartOfWeek = (date = new Date()) => {
  const d = getStartOfDay(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  return d
}

/**
 * Get start of month timestamp
 */
export const getStartOfMonth = (date = new Date()) => {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

/**
 * Check if a date is within a date range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  return d >= start && d <= end
}

/**
 * Get days ago from current date
 */
export const getDaysAgo = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

/**
 * Format date difference for display
 */
export const formatDateDifference = (date1, date2) => {
  const diff = Math.abs(new Date(date2) - new Date(date1))
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}m`
  return `${seconds}s`
}
