import {
  QUESTION_STATUS_CLASSES,
  QUESTION_STATUS,
  DEFAULT_MARKS,
} from '@/constants/testConfig'

export function calculateSectionStats(
  questions = [],
  answers = {},
  markedForReview = new Set()
) {
  let answered = 0
  let marked = 0
  let notVisited = 0
  for (const q of questions) {
    const isAnswered =
      Object.prototype.hasOwnProperty.call(answers, q.q_id) &&
      answers[q.q_id] !== null
    const isMarked = markedForReview.has(q.q_id)
    if (isMarked) marked++
    else if (isAnswered) answered++
    else notVisited++
  }
  return { answered, marked, notVisited }
}

export function getQuestionStatusClasses({
  question,
  qIndex,
  answers,
  markedForReview,
  currentQuestionIndex,
  isReviewMode = false,
}) {
  const qId = question.q_id
  const isAnswered =
    Object.prototype.hasOwnProperty.call(answers, qId) && answers[qId] !== null
  const isMarked = markedForReview.has(qId)
  const isCurrent = qIndex === currentQuestionIndex
  if (isCurrent) return QUESTION_STATUS_CLASSES[QUESTION_STATUS.CURRENT]

  if (isReviewMode) {
    if (isAnswered) {
      const isCorrect = answers[qId] === question.correct_opt_id
      return QUESTION_STATUS_CLASSES[
        isCorrect ? QUESTION_STATUS.CORRECT : QUESTION_STATUS.INCORRECT
      ]
    } else {
      // In review mode, if not answered, it's not visited
      return QUESTION_STATUS_CLASSES[QUESTION_STATUS.NOT_VISITED]
    }
  }

  // Not in review mode
  if (isMarked) return QUESTION_STATUS_CLASSES[QUESTION_STATUS.MARKED]
  if (isAnswered) return QUESTION_STATUS_CLASSES[QUESTION_STATUS.ANSWERED]
  return QUESTION_STATUS_CLASSES[QUESTION_STATUS.NOT_VISITED]
}

export const calculateScore = (examData, answersObj) => {
  if (!examData?.sections) {
    return { score: 0, correct: 0, incorrect: 0, unattempted: 0 }
  }
  let score = 0
  let correct = 0
  let incorrect = 0
  let totalQuestions = 0
  for (const section of examData.sections) {
    if (!section.questions?.length) continue
    totalQuestions += section.questions.length
    for (const question of section.questions) {
      const userAnswer = answersObj[question.q_id]
      if (userAnswer !== undefined && userAnswer !== null) {
        if (userAnswer === question.correct_opt_id) {
          score += question.marks || DEFAULT_MARKS.POSITIVE
          correct++
        } else {
          score -= question.negative_marks || DEFAULT_MARKS.NEGATIVE
          incorrect++
        }
      }
    }
  }
  return {
    score,
    correct,
    incorrect,
    unattempted: totalQuestions - (correct + incorrect),
  }
}
