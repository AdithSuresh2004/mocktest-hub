import { useState, useEffect, useMemo, useCallback } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'
import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

export function useAttempts() {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [filterScore, setFilterScore] = useState(0) // Changed to number for range

  const loadAttempts = useCallback(async () => {
    setLoading(true)
    const rawAttempts = getAllAttempts()
    const completed = rawAttempts.filter((a) => a.status === 'completed')

    const normalized = await Promise.all(completed.map(normalizeAttempt))
    const validAttempts = normalized.filter(Boolean) // Filter out nulls

    setAttempts(validAttempts)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadAttempts()
  }, [loadAttempts])

  const sortedAndFiltered = useMemo(() => {
    let filtered = [...attempts]

    if (filterScore > 0) {
      filtered = filtered.filter((a) => a.score >= filterScore)
    }

    filtered.sort((a, b) => {
      let compareValue = 0
      switch (sortBy) {
        case 'date':
          compareValue = new Date(b.date) - new Date(a.date)
          break
        case 'score':
          compareValue = (b.score || 0) - (a.score || 0)
          break
        case 'time':
          compareValue = (a.timeTaken || 0) - (b.timeTaken || 0)
          break
        default:
          compareValue = 0
      }
      return sortOrder === 'asc' ? -compareValue : compareValue
    })
    return filtered
  }, [attempts, sortBy, sortOrder, filterScore])

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return {
    attempts: sortedAndFiltered,
    loading,
    sortBy,
    sortOrder,
    filterScore,
    setFilterScore,
    toggleSort,
    originalAttempts: attempts, // This now holds normalized attempts
  }
}
