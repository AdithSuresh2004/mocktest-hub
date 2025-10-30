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
  if (style === 'short') return formatDateFns(date, 'do MMM yyyy')
  if (style === 'date') return formatDateFns(date, 'PPP')
  if (style === 'time') return formatDateFns(date, 'p')
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatAttemptDate = (timestamp) => formatDate(timestamp, 'short')

export const capitalizeText = (text) => (text ? text.toUpperCase() : '')

export const formatTime = (seconds) => {
  const numeric = Number(seconds)
  if (!Number.isFinite(numeric)) return '00:00:00'
  const totalSeconds = Math.max(0, Math.round(numeric))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDuration = (seconds) => {
  const numeric = Number(seconds)
  if (!Number.isFinite(numeric)) return '0m 0s'
  const totalSeconds = Math.max(0, Math.round(numeric))
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins}m ${secs}s`
}

