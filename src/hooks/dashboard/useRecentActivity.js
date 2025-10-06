import { useState, useEffect, useCallback } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'

import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

export function useRecentActivity() {
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const loadRecentActivity = useCallback(async () => {
    setLoading(true)
    try {
      const attempts = getAllAttempts()
      const recentRaw = attempts
        .filter((attempt) => attempt.status === 'completed')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5)
      const recentNormalized = await Promise.all(
        recentRaw.map(normalizeAttempt)
      )
      setRecentActivity(recentNormalized.filter(Boolean))
    } catch {
      setRecentActivity([])
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    loadRecentActivity()
  }, [loadRecentActivity])
  return { recentActivity, loading }
}
