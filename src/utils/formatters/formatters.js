import { format as formatDateFns } from 'date-fns'

const ensureDate = (value) => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export const formatDate = (timestamp, style = 'long') => {
  const date = ensureDate(timestamp)
  if (!date) return 'N/A'
  if (style === 'short') {
    return formatDateFns(date, 'do MMM yyyy')
  }
  if (style === 'date') {
    return formatDateFns(date, 'PPP')
  }
  if (style === 'time') {
    return formatDateFns(date, 'p')
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatAttemptDate = (timestamp) => formatDate(timestamp, 'short')

const performanceColorCache = new Map()

export const getPerformanceColor = (score, total) => {
  const percentage = total > 0 ? (score / total) * 100 : 0
  const key = Math.floor(percentage / 10)
  if (performanceColorCache.has(key)) {
    return performanceColorCache.get(key)
  }
  let color
  if (percentage >= 80) color = 'text-green-600 dark:text-green-400'
  else if (percentage >= 60) color = 'text-blue-600 dark:text-blue-400'
  else if (percentage >= 40) color = 'text-yellow-600 dark:text-yellow-400'
  else color = 'text-red-600 dark:text-red-400'
  performanceColorCache.set(key, color)
  return color
}

export const getDifficultyColor = (strength) => {
  const normalized = strength ? strength.toLowerCase() : 'medium'
  const colors = {
    easy: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    medium:
      'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    hard: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  }
  return (
    colors[normalized] ||
    'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
  )
}

export const normalizeStrength = (strength) => {
  if (!strength) return 'medium'
  return strength.toLowerCase()
}

export const capitalizeStrength = (strength) => {
  if (!strength) return 'Medium'
  return strength.charAt(0).toUpperCase() + strength.slice(1).toLowerCase()
}

export const capitalizeText = (text) => {
  if (!text) return ''
  return text.toUpperCase()
}

export const formatTime = (seconds) => {
  const numeric = Number(seconds)
  if (!Number.isFinite(numeric)) return '00:00:00'
  const totalSeconds = Math.max(0, Math.round(numeric))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDuration = (seconds) => {
  const numeric = Number(seconds)
  if (!Number.isFinite(numeric)) return '0m 0s'
  const totalSeconds = Math.max(0, Math.round(numeric))
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins}m ${secs}s`
}
