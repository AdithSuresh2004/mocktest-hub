import { analyzeSectionPerformance } from '@/utils/calculations/resultAnalysis'

const initializeExamState = (
  attempt,
  exam,
  setAnswers,
  setMarkedForReview,
  setCurrentSection,
  setCurrentQuestion,
  timer
) => {
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
  setCurrentSection(attempt._currentSection || 0)
  setCurrentQuestion(attempt._currentQuestion || 0)
  timer.setTime(attempt._timeRemainingSeconds || exam.duration_minutes * 60)

  return attempt.status === 'in_progress' && attempt._hasStarted
}

const startTimer = (
  hasStarted,
  attempt,
  timer,
  setHasStarted,
  updateAttempt,
  setAttempt
) => {
  if (!hasStarted && attempt) {
    timer.start()
    setHasStarted(true)
    const updatedAttempt = { ...attempt, _hasStarted: true }
    updateAttempt(attempt.attempt_id, updatedAttempt)
    setAttempt(updatedAttempt)
  }
}

const getQuestionStatusClasses = ({
  question,
  qIndex,
  answers,
  markedForReview,
  currentQuestionIndex,
  isReviewMode,
}) => {
  const isCurrent = qIndex === currentQuestionIndex
  const isMarked = markedForReview.has(question.q_id)
  const isAnswered = answers[question.q_id] != null

  if (isCurrent) {
    return 'bg-blue-500 text-white ring-2 ring-blue-300 dark:bg-blue-500 dark:ring-blue-400'
  }
  if (isReviewMode) {
    const isCorrect = answers[question.q_id] === question.correct_opt_id
    if (isAnswered) {
      return isCorrect
        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
        : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
    }
    return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }

  if (isMarked && isAnswered) {
    return 'bg-purple-200 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' // Answered and marked for review
  }
  if (isMarked) {
    return 'bg-purple-200 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' // Marked for review
  }
  if (isAnswered) {
    return 'bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300' // Answered
  }

  return 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600' // Not visited
}

const calculateSectionStats = (
  questions = [],
  answers = {},
  markedForReview = new Set(),
  isReviewMode = false
) => {
  let answered = 0
  let incorrect = 0
  let notVisited = 0

  for (const q of questions) {
    const userAnswer = answers[q.q_id]
    const isAnswered = userAnswer != null
    if (isAnswered) {
      answered++
      if (isReviewMode && userAnswer !== q.correct_opt_id) {
        incorrect++
      }
    } else if (!markedForReview.has(q.q_id)) {
      notVisited++
    }
  }

  return {
    total: questions.length,
    answered,
    incorrect,
    marked: markedForReview.size,
    notVisited,
  }
}

export { initializeExamState, startTimer, getQuestionStatusClasses, calculateSectionStats }


