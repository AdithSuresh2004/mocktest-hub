import { useState, useEffect } from 'react'
import { findExamById } from '@/data/examRepository'
import {
  getLatestInProgressAttempt,
  createAttempt,
} from '@/data/attemptRepository'

export const useExamLoader = (examId) => {
  const [exam, setExam] = useState(null)
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!examId) {
      setLoading(false)
      setError('Invalid exam ID.')
      return
    }

    const loadExam = async () => {
      setLoading(true)
      setError(null)

      try {
        const examData = await findExamById(examId)

        if (!examData || typeof examData !== 'object') {
          setError('Exam data is invalid or not found.')
          setLoading(false)
          return
        }

        const examIdToUse = examData.id || examData.exam_id
        if (!examIdToUse) {
          setError('Exam ID is missing from exam data.')
          setLoading(false)
          return
        }

        if (
          !examData.sections ||
          !Array.isArray(examData.sections) ||
          examData.sections.length === 0
        ) {
          setError('Exam data is incomplete or invalid (missing sections).')
          setLoading(false)
          return
        }

        setExam(examData)

        let activeAttempt = getLatestInProgressAttempt(examIdToUse)
        if (!activeAttempt) {
          const examName =
            examData.exam_name || examData.name || 'Untitled Exam'
          const durationMinutes = examData.duration_minutes || 60
          activeAttempt = createAttempt(examIdToUse, examName, durationMinutes)
        }

        if (!activeAttempt) {
          setError('Failed to create exam attempt. Please try again.')
          setLoading(false)
          return
        }

        setAttempt(activeAttempt)
      } catch (e) {
        setError('Failed to load exam attempt: ' + e.message)
      } finally {
        setLoading(false)
      }
    }

    loadExam()
  }, [examId])

  return { exam, attempt, loading, error, setExam, setAttempt }
}
