import { useEffect } from 'react'
import { updateAttempt } from '@/data/attemptRepository'

export const useExamPersistence = ({
  attempt,
  currentSection,
  currentQuestion,
  timerSeconds,
  markedForReview,
  answers,
  isSubmitted,
}) => {
  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return

    const saveState = setTimeout(() => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timerSeconds,
      })
    }, 5000)

    return () => clearTimeout(saveState)
  }, [
    currentSection,
    currentQuestion,
    timerSeconds,
    attempt?.attempt_id,
    isSubmitted,
  ])

  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return

    const handleBeforeUnload = () => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timerSeconds,
        _markedForReview: Array.from(markedForReview),
        responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
          q_id,
          selected_opt_id,
        })),
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [
    attempt?.attempt_id,
    isSubmitted,
    currentSection,
    currentQuestion,
    timerSeconds,
    markedForReview,
    answers,
  ])
}
