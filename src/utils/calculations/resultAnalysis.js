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

const calculatePerformanceOverTime = (completedExams) => {
  if (!completedExams || completedExams.length === 0) {
    return [];
  }

  const sortedExams = [...completedExams]
    .filter(exam => !isNaN(new Date(exam.date).getTime())) // Filter out invalid dates
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return sortedExams.map(exam => {
    const date = new Date(exam.date);
    const name = date.toLocaleDateString(); // No need to check for Invalid Date here, as they are already filtered
    return {
      name,
      score: exam.score,
    };
  });
};

export { calculateAnalysis, calculateScoreDistribution, calculatePerformanceOverTime };


