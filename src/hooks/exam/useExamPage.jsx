import { useState, useEffect, useRef } from 'react'
import { useExamLoader } from '@/hooks/exam/useExamLoader'
import { useExamNavigation } from '@/hooks/exam/useExamNavigation'
import { useExamSessionTimer } from './useExamSessionTimer'
import { useExamAttemptState } from './useExamAttemptState'
import { updateAttempt, removeAttempt } from '@/data/attemptRepository'
import { calculateAnalysis } from '@/utils/calculations/resultAnalysis'

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

  const finalizeExam = (isTimeUp = false) => {
    if (!exam || !attempt) return

    timer.stop()

    const analysis = calculateAnalysis(exam, {
      responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })),
    })

    const finalAttempt = {
      ...attempt,
      status: 'completed',
      time_taken: exam.duration_minutes * 60 - timer.seconds,
      score: analysis.score.actual,
      rawScore: {
        actual: analysis.overall.correct,
        total: analysis.overall.totalQuestions,
      },
      responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })),
      analysis,
    }

    updateAttempt(attempt.attempt_id, finalAttempt)
    setAttempt(finalAttempt)
    setIsSubmitted(true)
  }

  const { timer, startExamTimer } = useExamSessionTimer(
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

  const saveAndExitExam = () => {
    if (isSubmitted || !attempt?.attempt_id || !exam) return
    timer.stop()
    const updates = {
      _currentSection: navigation.currentSection,
      _currentQuestion: navigation.currentQuestion,
      _timeRemainingSeconds: timer.seconds,
      _markedForReview: Array.from(markedForReview),
      responses: Object.entries(answers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })),
    }
    updateAttempt(attempt.attempt_id, updates)
  }

  const deleteAndExitExam = () => {
    if (attempt) {
      removeAttempt(attempt.attempt_id)
    }
    timer.stop()
  }

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
