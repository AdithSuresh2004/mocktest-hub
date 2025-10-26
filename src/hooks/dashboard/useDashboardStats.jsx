import { useState, useEffect } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'

import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

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

  const loadStats = async () => {
    setLoading(true)
    try {
      const attempts = getAllAttempts()
      const pending = attempts.filter((a) => a.status === 'in_progress').length
      const completedRaw = attempts.filter((a) => a.status === 'completed')
      const completedNormalized = await Promise.allSettled(
        completedRaw.map(normalizeAttempt)
      )
      const validCompleted = completedNormalized
        .filter((result) => result.status === 'fulfilled' && result.value)
        .map((result) => result.value)
      let avgScore = 0
      let highScore = 0
      let avgTime = 0
      if (validCompleted.length > 0) {
        const toNumber = (value) => {
          const numeric = Number(value)
          return Number.isFinite(numeric) ? numeric : 0
        }
        const scores = validCompleted.map((attempt) => toNumber(attempt.score))
        avgScore =
          scores.reduce((sum, score) => sum + score, 0) / validCompleted.length
        highScore = Math.max(...scores)
        const times = validCompleted.map((attempt) => {
          const seconds = Math.max(0, toNumber(attempt.timeTaken))
          return seconds / 60
        })
        avgTime =
          times.reduce((sum, time) => sum + time, 0) / validCompleted.length
      }
      const newStats = {
        totalExams: attempts.length,
        pendingTests: pending,
        completedTests: validCompleted.length,
        averageScore: Number.isFinite(avgScore)
          ? parseFloat(avgScore.toFixed(1))
          : 0,
        highScore: Number.isFinite(highScore)
          ? parseFloat(highScore.toFixed(1))
          : 0,
        averageTime: Number.isFinite(avgTime)
          ? parseFloat(avgTime.toFixed(1))
          : 0,
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

  return { stats, loading, refreshStats: loadStats }
}
