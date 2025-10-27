import { 
  getQuestionMarks as baseGetQuestionMarks,
  getTotalMarks,
  getScore as baseGetScore,
  getPerformanceLevel 
} from './scoreCalculations'

export { calculateStreakData, getStreakMotivation, getAchievementBadges } from './streakCalculations'
export { 
  analyzeSectionPerformance, 
  calculateOverallStats, 
  calculateAnalysis,
  createResponsesMap 
} from './resultAnalysis'

export const getQuestionMarks = (question) => {
  if (typeof question.marks === 'number') {
    return question.marks
  }
  if (typeof question.marks === 'object' && question.marks?.total) {
    return question.marks.total
  }
  return 1
}

export const getScore = (attempt) => {
  if (typeof attempt?.score === 'number') {
    return attempt.score
  }
  if (typeof attempt?.score === 'object' && attempt.score?.total !== undefined) {
    return attempt.score.total
  }
  return 0
}

export const calculatePercentage = (score, total) => {
  if (!total || total === 0) return 0
  const percentage = (score / total) * 100
  return Math.round(percentage * 100) / 100
}

export const calculateAccuracy = (correct, attempted) => {
  if (!attempted || attempted === 0) return 0
  return ((correct / attempted) * 100).toFixed(1)
}

export const getTotalQuestions = (exam) => {
  if (!exam?.sections) return 0
  return exam.sections.reduce((sum, section) => {
    if (!Array.isArray(section.questions)) return sum
    return sum + section.questions.length
  }, 0)
}

export const calculateTotalMarks = (exam) => {
  if (!exam?.sections) return 0
  return exam.sections.reduce((sum, section) => {
    if (!Array.isArray(section.questions)) return sum
    return sum + section.questions.reduce((qSum, q) => {
      return qSum + getQuestionMarks(q)
    }, 0)
  }, 0)
}

export { getTotalMarks, getPerformanceLevel }

