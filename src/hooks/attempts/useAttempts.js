import { useState, useEffect } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'

import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

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
      const rawAttempts = getAllAttempts()
      const completed = rawAttempts.filter((a) => a.status === 'completed')
      const normalized = await Promise.all(completed.map(normalizeAttempt))
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
  let categories = ['all']
  let subjects = ['all']
  let topics = ['all']
  if (attempts.length > 0) {
    const categoriesSet = new Set()
    const subjectsSet = new Set()
    const topicsSet = new Set()
    attempts.forEach((attempt) => {
      if (attempt.category) {
        categoriesSet.add(attempt.category)
      }
      if (Array.isArray(attempt.subjects)) {
        attempt.subjects.forEach((s) => subjectsSet.add(s))
      }
      if (Array.isArray(attempt.topics)) {
        attempt.topics.forEach((t) => topicsSet.add(t))
      }
    })
    categories = ['all', ...Array.from(categoriesSet).sort()]
    subjects = ['all', ...Array.from(subjectsSet).sort()]
    topics = ['all', ...Array.from(topicsSet).sort()]
  }
  let sortedAndFiltered = [...attempts]
  if (filters.category !== 'all') {
    sortedAndFiltered = sortedAndFiltered.filter((a) => a.category === filters.category)
  }
  if (filters.subject !== 'all') {
    sortedAndFiltered = sortedAndFiltered.filter(
      (a) => a.subjects && a.subjects.includes(filters.subject)
    )
  }
  if (filters.topic !== 'all') {
    sortedAndFiltered = sortedAndFiltered.filter(
      (a) => a.topics && a.topics.includes(filters.topic)
    )
  }
  sortedAndFiltered.sort((a, b) => {
    const compareValue = (b.score || 0) - (a.score || 0)
    return sortOrder === 'asc' ? -compareValue : compareValue
  })
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
