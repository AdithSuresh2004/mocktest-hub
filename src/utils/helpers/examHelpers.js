export function calculateSectionStats(
  questions = [],
  answers = {},
  markedForReview = new Set(),
) {
  return questions.reduce(
    (acc, q) => {
      const isAnswered =
        answers.hasOwnProperty(q.q_id) && answers[q.q_id] !== null
      const isMarked = markedForReview.has(q.q_id)
      if (isMarked) acc.marked++
      else if (isAnswered) acc.answered++
      else acc.notVisited++
      return acc
    },
    { answered: 0, marked: 0, notVisited: 0 },
  )
}
export function getQuestionStatusClasses({
  question,
  qIndex,
  answers,
  markedForReview,
  currentSectionIndex,
  currentQuestionIndex,
  visibleSectionIndex,
}) {
  const qId = question.q_id
  const isAnswered = answers.hasOwnProperty(qId) && answers[qId] !== null
  const isMarked = markedForReview.has(qId)
  const isCurrent =
    visibleSectionIndex === currentSectionIndex &&
    qIndex === currentQuestionIndex
  if (isCurrent) return 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
  if (isMarked) return 'bg-purple-600 hover:bg-purple-700 text-white'
  if (isAnswered) return 'bg-green-600 hover:bg-green-700 text-white'
  return 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
}
export const calculateScore = (examData, answersObj) => {
  if (!examData || !examData.sections) {
    return { score: 0, correct: 0, incorrect: 0, unattempted: 0 }
  }

  let score = 0
  let correct = 0
  let incorrect = 0
  let unattempted = 0
  let totalQuestions = 0

  examData.sections.forEach((section) => {
    if (section.questions && Array.isArray(section.questions)) {
      totalQuestions += section.questions.length
      section.questions.forEach((question) => {
        const userAnswer = answersObj[question.q_id]
        if (userAnswer !== undefined && userAnswer !== null) {
          if (userAnswer === question.correct_opt_id) {
            score += question.marks || 4
            correct++
          } else {
            score -= question.negative_marks || 1
            incorrect++
          }
        }
      })
    }
  })

  unattempted = totalQuestions - (correct + incorrect)

  return { score, correct, incorrect, unattempted }
}
export function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '00:00:00'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
