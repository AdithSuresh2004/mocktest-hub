import { getAllAttempts, findAttemptById } from '@/data/attemptRepository'
import { getStartOfDay, getStartOfWeek, getStartOfMonth } from '@/utils/helpers/dateHelpers'

export const getCompletedAttempts = () => {
  return getAllAttempts().filter((a) => a.status === 'completed')
}

export const getAttemptsForPeriod = (period = 'all') => {
  const allAttempts = getCompletedAttempts()
  const today = getStartOfDay()
  
  if (period === 'all') return allAttempts
  
  const startDate = period === 'today' 
    ? today 
    : period === 'week' 
      ? getStartOfWeek(today) 
      : getStartOfMonth(today)
  
  return allAttempts.filter((a) => new Date(a.timestamp) >= startDate)
}

export const getAttemptById = (attemptId) => {
  return findAttemptById(attemptId)
}

export const getAttemptCategories = (attempts) => {
  const categories = new Set()
  attempts.forEach((attempt) => {
    if (attempt.category) categories.add(attempt.category)
  })
  return ['all', ...Array.from(categories).sort()]
}

export const getAttemptSubjects = (attempts) => {
  const subjects = new Set()
  attempts.forEach((attempt) => {
    if (Array.isArray(attempt.subjects)) {
      attempt.subjects.forEach((s) => subjects.add(s))
    }
  })
  return ['all', ...Array.from(subjects).sort()]
}

export const getAttemptTopics = (attempts) => {
  const topics = new Set()
  attempts.forEach((attempt) => {
    if (Array.isArray(attempt.topics)) {
      attempt.topics.forEach((t) => topics.add(t))
    }
  })
  return ['all', ...Array.from(topics).sort()]
}

