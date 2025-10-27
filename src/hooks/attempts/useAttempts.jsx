import { useState, useEffect } from 'react'
import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'
import {
  getCompletedAttempts,
  getAttemptCategories,
  getAttemptSubjects,
  getAttemptTopics,
} from '@/services/attemptService'
import { filterAttempts, sortAttempts } from '@/services/filterService'

const createDefaultFilters = () => ({
  category: 'all',
  subject: 'all',
  topic: 'all',
})

export function useAttempts() {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('desc')
  const [filters, setFilters] = useState(createDefaultFilters)

  const loadAttempts = async () => {
    setLoading(true)
    try {
      const rawAttempts = getCompletedAttempts()
      const normalized = await Promise.all(rawAttempts.map(normalizeAttempt))
      const validAttempts = normalized.filter(Boolean)
      setAttempts(validAttempts)
    } catch {
      setAttempts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAttempts()
  }, [])

  const categories = getAttemptCategories(attempts)
  const subjects = getAttemptSubjects(attempts)
  const topics = getAttemptTopics(attempts)

  const sortedAndFiltered = sortAttempts(
    filterAttempts(attempts, filters),
    sortOrder
  )
  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => {
      const next = { ...prev, [filterName]: value }
      if (filterName === 'category') {
        next.subject = 'all'
        next.topic = 'all'
      }
      if (filterName === 'subject') {
        next.topic = 'all'
      }
      return next
    })
  }
  const resetFilters = () => {
    setFilters(createDefaultFilters())
  }
  return {
    attempts: sortedAndFiltered,
    loading,
    sortOrder,
    filters,
    filterOptions: { categories, subjects, topics },
    handleFilterChange,
    toggleSort,
    originalAttempts: attempts,
    resetFilters,
  }
}
