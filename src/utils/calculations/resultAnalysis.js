import { createResponsesMap } from './responseMapping'
import { analyzeSectionPerformance } from './sectionAnalysis'
import { calculateOverallStats } from './overallStats'
import { calculateScoreDistribution } from './scoreDistribution'

const calculateAnalysis = (examData, attemptData) => {
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
      sectionScores,
      examData.marking_scheme
    )
  )

  const totalQuestionsOverall = examData.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  )

  const overall = calculateOverallStats(sectionAnalysis, totalQuestionsOverall)

  const totalMarks = sectionAnalysis.reduce(
    (total, section) => total + section.totalMarks,
    0
  )

  const actualScore = sectionAnalysis.reduce(
    (total, section) => total + section.marksObtained,
    0
  )

  return {
    sectionAnalysis,
    overall,
    score: {
      actual: actualScore,
      total: totalMarks,
    },
    accuracy: {
      percentage: overall.accuracy,
    },
  }
}

export { calculateAnalysis, calculateScoreDistribution }


