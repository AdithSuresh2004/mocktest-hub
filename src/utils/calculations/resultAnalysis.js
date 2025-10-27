import { getQuestionMarks } from './scoreCalculations'

export const createResponsesMap = (responses) => {
  const responsesMap = {}
  if (responses) {
    responses.forEach((r) => {
      responsesMap[r.q_id] = r.selected_opt_id
    })
  }
  return responsesMap
}

export const analyzeSectionPerformance = (
  section,
  sectionIndex,
  responsesMap,
  sectionScores
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
    } else if (userAnswer === question.correct_opt_id) {
      sectionCorrect++
      sectionMarks += questionMarks
    } else {
      sectionIncorrect++
    }
  })

  const actualSectionMarks =
    sectionScores[sectionKey] !== undefined
      ? sectionScores[sectionKey]
      : sectionMarks

  return {
    sectionName: section.section_name,
    correct: sectionCorrect,
    incorrect: sectionIncorrect,
    unanswered: sectionUnanswered,
    totalQuestions: section.questions.length,
    marksObtained: actualSectionMarks,
    totalMarks: sectionTotalMarks,
    accuracy:
      section.questions.length > 0
        ? ((sectionCorrect / section.questions.length) * 100).toFixed(1)
        : 0,
    stats: {
      correct: sectionCorrect,
      incorrect: sectionIncorrect,
      unanswered: sectionUnanswered,
    },
  }
}

export const calculateOverallStats = (
  sectionAnalysis,
  totalQuestionsOverall
) => {
  const totals = sectionAnalysis.reduce(
    (acc, section) => ({
      correct: acc.correct + section.correct,
      incorrect: acc.incorrect + section.incorrect,
      unanswered: acc.unanswered + section.unanswered,
    }),
    { correct: 0, incorrect: 0, unanswered: 0 }
  )

  const totalAttempted = totals.correct + totals.incorrect

  return {
    correct: totals.correct,
    incorrect: totals.incorrect,
    unanswered: totals.unanswered,
    totalQuestions: totalQuestionsOverall,
    attempted: totalAttempted,
    accuracy:
      totalAttempted > 0
        ? ((totals.correct / totalAttempted) * 100).toFixed(1)
        : 0,
    percentage:
      totalQuestionsOverall > 0
        ? ((totals.correct / totalQuestionsOverall) * 100).toFixed(1)
        : 0,
  }
}

export const calculateAnalysis = (examData, attemptData) => {
  const responsesMap = createResponsesMap(attemptData.responses)

  const sectionScores =
    typeof attemptData.score === 'object' && attemptData.score?.per_section
      ? attemptData.score.per_section
      : {}

  const sectionAnalysis = examData.sections.map((section, sectionIndex) =>
    analyzeSectionPerformance(
      section,
      sectionIndex,
      responsesMap,
      sectionScores
    )
  )

  const totalQuestionsOverall = examData.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  )

  const overall = calculateOverallStats(sectionAnalysis, totalQuestionsOverall)

  return {
    sectionAnalysis,
    overall,
  }
}

export const calculateScoreDistribution = (completedExams) => {
  const distribution = [
    { name: '90-100%', value: 0, color: '#10b981' },
    { name: '75-89%', value: 0, color: '#3b82f6' },
    { name: '50-74%', value: 0, color: '#f59e0b' },
    { name: '0-49%', value: 0, color: '#ef4444' },
  ];

  completedExams.forEach((exam) => {
    const score = exam.score || 0;
    if (score >= 90) {
      distribution[0].value++;
    } else if (score >= 75) {
      distribution[1].value++;
    } else if (score >= 50) {
      distribution[2].value++;
    } else {
      distribution[3].value++;
    }
  });

  return distribution.filter((item) => item.value > 0);
};
