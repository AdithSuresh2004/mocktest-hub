import { useState, useEffect } from 'react'
import { getAllAttempts, removeAttempt } from '@/data/attemptRepository'

export function usePendingTests() {
  const [pendingTests, setPendingTests] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPendingTests = () => {
    setLoading(true)
    try {
      const attempts = getAllAttempts()
      const pending = attempts
        .filter((a) => a.status === 'in_progress')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setPendingTests(pending)
    } catch {
      return []
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPendingTests()
  }, [])

  const deletePendingTest = (attemptId) => {
    try {
      removeAttempt(attemptId)
      loadPendingTests()
      return true
    } catch (error) {
      return false
    }
  }

  return { pendingTests, loading, deletePendingTest }
}
