import { useState, useEffect, useRef } from 'react'
import { findExamById } from '@/data/examRepository'

import {
  getLatestInProgressAttempt,
  createAttempt,
  updateAttempt,
  removeAttempt,
} from '@/data/attemptRepository'
import { useExamNavigation } from '@/hooks/exam/useExamNavigation'
import { useTimer } from '@/hooks/exam/useTimer'

import { calculateScore } from '@/utils/helpers/examHelpers'

export default function useExam(examId) {
  const [exam, setExam] = useState(null)
  const [attempt, setAttempt] = useState(null)
  const [answers, setAnswers] = useState({})
  const [markedForReview, setMarkedForReview] = useState(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const navigation = useExamNavigation(exam?.sections || [])
  const {
    currentSection,
    currentQuestion,
    setCurrentSection,
    setCurrentQuestion,
  } = navigation
  const finalizeExamRef = useRef(null)
  const onTimerEnd = () => {
    if (finalizeExamRef.current) {
      finalizeExamRef.current(true)
    }
  }
  const timer = useTimer(0, onTimerEnd)
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
        const answersObj = {}
        if (activeAttempt.responses && Array.isArray(activeAttempt.responses)) {
          activeAttempt.responses.forEach((response) => {
            answersObj[response.q_id] = response.selected_opt_id
          })
        }
        setAnswers(answersObj)
        setMarkedForReview(new Set(activeAttempt._markedForReview || []))
        const submitted = activeAttempt.status === 'completed'
        setIsSubmitted(submitted)
        setCurrentSection(activeAttempt._currentSection || 0)
        setCurrentQuestion(activeAttempt._currentQuestion || 0)
        timer.setTime(
          activeAttempt._timeRemainingSeconds || examData.duration_minutes * 60
        )

        if (activeAttempt.status === 'in_progress' && activeAttempt._hasStarted) {
          setHasStarted(true)
        } else {
          setHasStarted(false)
        }
      } catch (e) {
        setError('Failed to load exam attempt: ' + e.message)
      } finally {
        setLoading(false)
      }
    }
    loadExam()
  }, [examId])

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
  }, [currentSection, currentQuestion, timer, attempt?.attempt_id, isSubmitted])
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
  const handleAnswer = (questionId, optionId) => {
    if (isSubmitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
    if (attempt) {
      const currentResponses = attempt.responses || []
      const existingResponseIndex = currentResponses.findIndex(
        (r) => r.q_id === questionId
      )
      let newResponses
      if (existingResponseIndex > -1) {
        newResponses = [...currentResponses]
        newResponses[existingResponseIndex] = {
          q_id: questionId,
          selected_opt_id: optionId,
        }
      } else {
        newResponses = [
          ...currentResponses,
          { q_id: questionId, selected_opt_id: optionId },
        ]
      }
      updateAttempt(attempt.attempt_id, { responses: newResponses })
    }
  }
  const toggleMarkForReview = (questionId) => {
    if (isSubmitted) return
    setMarkedForReview((prev) => {
      const newMarked = new Set(prev)
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId)
      } else {
        newMarked.add(questionId)
      }
      if (attempt) {
        updateAttempt(attempt.attempt_id, {
          _markedForReview: Array.from(newMarked),
        })
      }
      return newMarked
    })
  }
  const finalizeExam = () => {
      if (isSubmitted || !attempt || !exam) return null
      timer.stop()
      const finalAnswers = Object.entries(answers).map(
        ([q_id, selected_opt_id]) => ({
          q_id,
          selected_opt_id,
        })
      )
      const { score, correct, incorrect, unattempted } = calculateScore(
        exam,
        answers
      )
      const timeTaken = exam.duration_minutes * 60 - timer.seconds
      const finalAttempt = {
        ...attempt,
        status: 'completed',
        responses: finalAnswers,
        score,
        correct_count: correct,
        incorrect_count: incorrect,
        unattempted_count: unattempted,
        time_taken: timeTaken,
        _timeRemainingSeconds: 0,
      }
      updateAttempt(attempt.attempt_id, finalAttempt)
      setAttempt(finalAttempt)
      setIsSubmitted(true)
      return finalAttempt
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
    restartExam,
    startExamTimer,
  }
}
