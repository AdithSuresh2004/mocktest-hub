import { getAllAttempts, findAttemptById } from '@/data/attemptRepository'
import {
  getStartOfDay,
  getStartOfWeek,
  getStartOfMonth,
} from '@/utils/helpers/dateHelpers'

export const getCompletedAttempts = () => {
  return getAllAttempts().filter((a) => a.status === 'completed')
}

export const getAttemptsForPeriod = (period = 'all') => {
  const allAttempts = getCompletedAttempts()
  const today = getStartOfDay()

  if (period === 'all') return allAttempts

  const startDate =
    period === 'today'
      ? today
      : period === 'week'
        ? getStartOfWeek(today)
        : getStartOfMonth(today)

  return allAttempts.filter((a) => new Date(a.timestamp) >= startDate)
}

export const getAttemptById = (attemptId) => {
  return findAttemptById(attemptId)
}

const getUniqueAttemptProperty = (attempts, property) => {
  const propertySet = new Set()
  attempts.forEach((attempt) => {
    const value = attempt[property]
    if (Array.isArray(value)) {
      value.forEach((item) => propertySet.add(item))
    } else if (value) {
      propertySet.add(value)
    }
  })
  return ['all', ...Array.from(propertySet).sort()]
}

export const getAttemptCategories = (attempts) => {
  return getUniqueAttemptProperty(attempts, 'category')
}

export const getAttemptSubjects = (attempts) => {
  return getUniqueAttemptProperty(attempts, 'subjects')
}

export const getAttemptTopics = (attempts) => {
  return getUniqueAttemptProperty(attempts, 'topics')
}
