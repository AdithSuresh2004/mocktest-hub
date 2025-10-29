import { useState, useEffect, useRef } from 'react'
import { useExamLoader } from '@/hooks/exam/useExamLoader'
import { useExamNavigation } from '@/hooks/exam/useExamNavigation'
import { useExamSessionTimer } from './useExamSessionTimer'
import { useExamAttemptState } from './useExamAttemptState'
import { useExamFinalization } from './useExamFinalization'
import { useExamExitActions } from './useExamExitActions'
import { updateAttempt, removeAttempt } from '@/data/attemptRepository'

const useExamPage = (examId) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const { exam, attempt, loading, error, setAttempt } = useExamLoader(examId)

  const navigation = useExamNavigation(exam?.sections || [])
  const {
    currentSection,
    currentQuestion,
    setCurrentSection,
    setCurrentQuestion,
  } = navigation

  const {
    answers,
    setAnswers,
    markedForReview,
    setMarkedForReview,
    saveAnswer,
    toggleMarkForReview,
  } = useExamAttemptState(attempt)

  const { timer, startExamSession: startExamTimer } = useExamSessionTimer(
    attempt,
    exam,
    hasStarted,
    setHasStarted,
    setAnswers,
    setMarkedForReview,
    setCurrentSection,
    setCurrentQuestion,
    () => finalizeExam(true), // onTimerEnd callback
    updateAttempt,
    setAttempt
  )

  const { finalizeExam } = useExamFinalization(
    exam,
    attempt,
    answers,
    timer,
    setAttempt,
    setIsSubmitted
  )

  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return

    const saveState = setTimeout(() => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timer.seconds,
      })
    }, 5000)

    return () => clearTimeout(saveState)
  }, [
    currentSection,
    currentQuestion,
    timer.seconds,
    attempt?.attempt_id,
    isSubmitted,
  ])

  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return

    const handleBeforeUnload = () => {
      updateAttempt(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timer.seconds,
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
    timer.seconds,
    markedForReview,
    answers,
  ])

  const { saveAndExitExam, deleteAndExitExam } = useExamExitActions(
    isSubmitted,
    attempt,
    exam,
    timer,
    navigation,
    markedForReview,
    answers
  )

  const handleAnswer = (questionId, optionId) => {
    if (isSubmitted) return
    saveAnswer(questionId, optionId)
  }

  return {
    exam,
    attempt,
    answers,
    markedForReview,
    isSubmitted,
    hasStarted,
    error,
    loading,
    navigation,
    timer,
    handleAnswer,
    toggleMarkForReview,
    finalizeExam,
    saveAndExitExam,
    deleteAndExitExam,
    startExamTimer,
  }
}

export default useExamPage
