import { getQuestionMarks } from './scoreCalculations'

const analyzeSectionPerformance = (
  section,
  sectionIndex,
  responsesMap,
  sectionScores,
  markingScheme = {}
) => {
  let sectionCorrect = 0
  let sectionIncorrect = 0
  let sectionUnanswered = 0
  let sectionMarks = 0
  let sectionTotalMarks = 0

  const sectionKey =
    section.section_id ||
    section.section_name?.[0] ||
    String.fromCharCode(65 + sectionIndex)

  section.questions.forEach((question) => {
    const userAnswer = responsesMap[question.q_id]
    const questionMarks = getQuestionMarks(question)
    sectionTotalMarks += questionMarks

    if (!userAnswer) {
      sectionUnanswered++
      sectionMarks += markingScheme.unattempted || 0
    } else if (userAnswer === question.correct_opt_id) {
      sectionCorrect++
      sectionMarks += markingScheme.correct_answer || questionMarks
    } else {
      sectionIncorrect++
      sectionMarks += markingScheme.incorrect_answer || 0
    }
  })

  const actualSectionMarks =
    sectionScores[sectionKey] !== undefined
      ? sectionScores[sectionKey]
      : sectionMarks

  const totalAttempted = sectionCorrect + sectionIncorrect

  return {
    sectionName: section.section_name,
    correct: sectionCorrect,
    incorrect: sectionIncorrect,
    unanswered: sectionUnanswered,
    totalQuestions: section.questions.length,
    marksObtained: actualSectionMarks,
    totalMarks: sectionTotalMarks,
    accuracy:
      totalAttempted > 0
        ? Number(((sectionCorrect / totalAttempted) * 100).toFixed(1))
        : 0,
    stats: {
      correct: sectionCorrect,
      incorrect: sectionIncorrect,
      unanswered: sectionUnanswered,
    },
  }
}

export { analyzeSectionPerformance }
