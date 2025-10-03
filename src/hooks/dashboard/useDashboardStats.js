import { useState, useEffect, useCallback } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'
import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalExams: 0,
    pendingTests: 0,
    completedTests: 0,
    averageScore: 0,
  })
  const [loading, setLoading] = useState(true)

  const loadStats = useCallback(async () => {
    setLoading(true)
    try {
      const attempts = getAllAttempts()
      const pending = attempts.filter((a) => a.status === 'in_progress').length
      const completedRaw = attempts.filter((a) => a.status === 'completed')

      const completedNormalized = await Promise.all(
        completedRaw.map(normalizeAttempt),
      )
      const validCompleted = completedNormalized.filter(Boolean)

      let avgScore = 0
      let highScore = 0
      let avgAccuracy = 0

      if (validCompleted.length > 0) {
        const percentages = validCompleted.map((a) => a.score.percentage || 0)
        avgScore =
          percentages.reduce((sum, p) => sum + p, 0) / validCompleted.length
        highScore = Math.max(...percentages)
        avgAccuracy =
          validCompleted.reduce((sum, a) => sum + (a.accuracy || 0), 0) /
          validCompleted.length
      }

      setStats({
        totalExams: attempts.length,
        pendingTests: pending,
        completedTests: validCompleted.length,
        averageScore: avgScore,
        highScore: highScore,
        averageAccuracy: avgAccuracy,
      })
    } catch (error) {
      setStats({
        totalExams: 0,
        pendingTests: 0,
        completedTests: 0,
        averageScore: 0,
        highScore: 0,
        averageAccuracy: 0,
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  return { stats, loading }
}
