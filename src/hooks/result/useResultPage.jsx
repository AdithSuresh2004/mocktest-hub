import { useState, useEffect } from 'react'
import { findAttemptById } from '@/data/attemptRepository'
import { findExamById } from '@/data/examRepository'

const useResultPage = (attemptId) => {
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadResult = async () => {
      setLoading(true)
      try {
        const attemptData = await findAttemptById(attemptId)
        if (!attemptData) {
          setError('Attempt not found.')
          setLoading(false)
          return
        }

        if (attemptData.status !== 'completed') {
          setError('This exam has not been completed yet.')
          setLoading(false)
          return
        }

        const exam = await findExamById(attemptData.exam_id)
        if (!exam) {
          setError('Associated exam could not be found.')
          setLoading(false)
          return
        }

        setAttempt({ ...attemptData, exam_name: exam.name })
      } catch (e) {
        setError('Failed to load result data.')
      } finally {
        setLoading(false)
      }
    }

    loadResult()
  }, [attemptId])

  return { attempt, loading, error }
}

export default useResultPage
