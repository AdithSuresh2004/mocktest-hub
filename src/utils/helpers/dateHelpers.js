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
 * Get days ago from current date
 */
export const getDaysAgo = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}
