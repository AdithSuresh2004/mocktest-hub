import { useState, useEffect, useRef } from 'react'
import { useExamLoader } from '@/hooks/exam/useExamLoader'
import { useExamAnswers } from '@/hooks/exam/useExamAnswers'
import { useExamPersistence } from '@/hooks/exam/useExamPersistence'
import { useExamFinalize } from '@/hooks/exam/useExamFinalize'
import { useExamNavigation } from '@/hooks/exam/useExamNavigation'
import { useTimer } from '@/hooks/exam/useTimer'
import {
  updateAttempt,
  removeAttempt,
  createAttempt,
} from '@/data/attemptRepository'

const useExam = (examId) => {
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
    markedForReview,
    setAnswers,
    setMarkedForReview,
    saveAnswer,
    toggleMarkForReview,
  } = useExamAnswers(attempt)

  const finalizeExamRef = useRef(null)
  const onTimerEnd = () => {
    if (finalizeExamRef.current) {
      finalizeExamRef.current(true)
    }
  }
  const timer = useTimer(0, onTimerEnd)

  useEffect(() => {
    if (!attempt) return

    const answersObj = {}
    if (attempt.responses && Array.isArray(attempt.responses)) {
      attempt.responses.forEach((response) => {
        answersObj[response.q_id] = response.selected_opt_id
      })
    }
    setAnswers(answersObj)
    setMarkedForReview(new Set(attempt._markedForReview || []))

    const submitted = attempt.status === 'completed'
    setIsSubmitted(submitted)
    setCurrentSection(attempt._currentSection || 0)
    setCurrentQuestion(attempt._currentQuestion || 0)
    timer.setTime(attempt._timeRemainingSeconds || exam.duration_minutes * 60)

    setHasStarted(attempt.status === 'in_progress' && attempt._hasStarted)
  }, [attempt, setAnswers, setMarkedForReview, setCurrentSection, setCurrentQuestion, exam, timer])

  useEffect(() => {
    if (
      hasStarted &&
      attempt?.status === 'in_progress' &&
      attempt?._hasStarted
    ) {
      timer.start()
    }
  }, [hasStarted, attempt?.status, attempt?._hasStarted, timer])

  const { finalizeExam } = useExamFinalize(
    exam,
    attempt,
    answers,
    timer,
    setAttempt,
    setIsSubmitted
  )

  useExamPersistence({
    attempt,
    currentSection,
    currentQuestion,
    timerSeconds: timer.seconds,
    markedForReview,
    answers,
    isSubmitted,
  })
  const saveAndExitExam = () => {
    if (isSubmitted || !attempt?.attempt_id || !exam) return
    timer.stop()
    const responses = Object.entries(answers).map(
      ([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id,
      })
    )
    const updates = {
      status: 'in_progress',
      _currentSection: currentSection,
      _currentQuestion: currentQuestion,
      _timeRemainingSeconds: timer.seconds,
      responses,
    }
    updateAttempt(attempt.attempt_id, updates)
  }

  const deleteAndExitExam = () => {
    if (attempt) {
      removeAttempt(attempt.attempt_id)
    }
    timer.stop()
  }

  useEffect(() => {
    finalizeExamRef.current = finalizeExam
  }, [finalizeExam])

  const restartExam = () => {
    if (!exam) return
    if (attempt) {
      removeAttempt(attempt.attempt_id)
    }
    const newAttempt = createAttempt(
      exam.id || exam.exam_id,
      exam.duration_minutes
    )
    setAttempt(newAttempt)
    setAnswers({})
    setMarkedForReview(new Set())
    setIsSubmitted(false)
    setCurrentSection(0)
    setCurrentQuestion(0)
    setHasStarted(false)
    timer.setTime(exam.duration_minutes * 60)
  }

  const startExamTimer = () => {
    if (!hasStarted && attempt) {
      timer.start()
      setHasStarted(true)
      const updatedAttempt = { ...attempt, _hasStarted: true }
      updateAttempt(attempt.attempt_id, updatedAttempt)
      setAttempt(updatedAttempt)
    }
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

export default useExam
