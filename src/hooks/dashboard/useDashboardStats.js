import { useState, useEffect } from 'react'
import { getAllAttempts } from '@/data/attemptRepository'
import { normalizeAttempt } from '@/utils/helpers/attemptHelpers'

const DEFAULT_STATS = {
  totalExams: 0,
  pendingTests: 0,
  completedTests: 0,
  averageScore: 0,
  highScore: 0,
  averageAccuracy: 0,
}

export function useDashboardStats() {
  const [stats, setStats] = useState(DEFAULT_STATS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      try {
        const attempts = getAllAttempts()
        const pending = attempts.filter((a) => a.status === 'in_progress').length
        const completedRaw = attempts.filter((a) => a.status === 'completed')

        const completedNormalized = await Promise.all(completedRaw.map(normalizeAttempt))
        const validCompleted = completedNormalized.filter(Boolean)

        let avgScore = 0
        let highScore = 0
        let avgAccuracy = 0

        if (validCompleted.length > 0) {
          const scores = validCompleted.map((a) => a.score || 0)
          avgScore = scores.reduce((sum, p) => sum + p, 0) / validCompleted.length
          highScore = Math.max(...scores)

          const accuracies = validCompleted.map((a) => {
            if (a.rawScore?.correct_count !== undefined && a.rawScore?.incorrect_count !== undefined) {
              const total = a.rawScore.correct_count + a.rawScore.incorrect_count
              return total > 0 ? (a.rawScore.correct_count / total) * 100 : 0
            }
            return a.score || 0
          })
          avgAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / validCompleted.length
        }

        setStats({
          totalExams: attempts.length,
          pendingTests: pending,
          completedTests: validCompleted.length,
          averageScore: avgScore,
          highScore,
          averageAccuracy,
        })
      } catch (error) {
        setStats(DEFAULT_STATS)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return { stats, loading }
}
