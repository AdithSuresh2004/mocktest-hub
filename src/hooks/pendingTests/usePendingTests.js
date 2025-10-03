import { useState, useEffect, useCallback } from 'react'
import { getAllAttempts, removeAttempt } from '@/data/attemptRepository'

export function usePendingTests() {
  const [pendingTests, setPendingTests] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPendingTests = useCallback(() => {
    setLoading(true)
    try {
      const attempts = getAllAttempts()
      const pending = attempts
        .filter((a) => a.status === 'in_progress')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setPendingTests(pending)
    } catch (error) {
      setPendingTests([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPendingTests()
  }, [loadPendingTests])

  const deletePendingTest = useCallback(
    (attemptId) => {
      try {
        removeAttempt(attemptId)
        loadPendingTests()
        return true
      } catch (error) {
        return false
      }
    },
    [loadPendingTests],
  )

  return { pendingTests, loading, deletePendingTest }
}
