import { useState, useEffect } from 'react'
import { findAttemptById } from '@/data/attemptRepository'
import { findExamById } from '@/data/examRepository'
import {
  getTotalMarks,
  getScore,
  getPerformanceLevel,
} from '@/utils/calculations/scoreCalculations'
import { calculateAnalysis } from '@/utils/calculations/resultAnalysis'

const useResultAnalysis = (attemptId) => {
  const [attempt, setAttempt] = useState(null)
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadResult = async () => {
      setLoading((prev) => (prev !== true ? true : prev))
      setError(null)
      try {
        const attemptData = findAttemptById(attemptId)
        if (!attemptData) {
          setError('Attempt not found.')
          setLoading(false)
          return
        }
        if (attemptData.status !== 'completed') {
          setError('This attempt is not completed yet.')
          setLoading(false)
          return
        }
        const examData = await findExamById(attemptData.exam_id)
        if (!examData) {
          setError('Exam details not found.')
          setLoading(false)
          return
        }
        const analysisData = calculateAnalysis(examData, attemptData)
        if (isMounted) {
          setAttempt(attemptData)
          setExam(examData)
          setAnalysis(analysisData)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load result.')
          setLoading(false)
        }
      }
    }

    loadResult()

    return () => {
      isMounted = false
    }
  }, [attemptId])

  const totalMarks = exam ? getTotalMarks(exam) : 0
  const actualScore = attempt ? getScore(attempt) : 0

  return {
    loading,
    error,
    attempt,
    exam,
    analysis,
    totalMarks,
    actualScore,
  }
}

export { getPerformanceLevel }
export default useResultAnalysis
