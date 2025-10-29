import { useState, useEffect } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'

import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

import { calculateAttemptStats } from '@/utils/calculations/attemptStats'

const DEFAULT_STATS = {
  totalExams: 0,
  pendingTests: 0,
  completedTests: 0,
  averageScore: 0,
  highScore: 0,
  averageTime: 0,
}

export function useDashboardStats() {
  const [stats, setStats] = useState(DEFAULT_STATS)
  const [loading, setLoading] = useState(true)
  const [validCompleted, setValidCompleted] = useState([])

  const loadStats = async () => {
    setLoading(true)
    try {
      const attempts = getAllAttempts()
      const pending = attempts.filter((a) => a.status === 'in_progress').length
      const completedRaw = attempts.filter((a) => a.status === 'completed')
      const completedNormalized = await Promise.allSettled(
        completedRaw.map(normalizeAttempt)
      )
      const completed = completedNormalized
        .filter((result) => result.status === 'fulfilled' && result.value)
        .map((result) => result.value)

      setValidCompleted(completed)

      const { avgScore, bestScore, avgTime } = calculateAttemptStats(completed)

      const newStats = {
        totalExams: attempts.length,
        pendingTests: pending,
        completedTests: completed.length,
        averageScore: avgScore,
        highScore: bestScore,
        averageTime: avgTime,
      }
      setStats(newStats)
    } catch {
      setStats(DEFAULT_STATS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
    const handleStorageChange = (e) => {
      if (e.key === 'exam_attempts') {
        loadStats()
      }
    }
    const handleRefreshStats = () => {
      loadStats()
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('refreshDashboardStats', handleRefreshStats)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('refreshDashboardStats', handleRefreshStats)
    }
  }, [])

  return { stats, loading, refreshStats: loadStats, validCompleted }
}
