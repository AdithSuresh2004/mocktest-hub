import {
  getQuestionMarks as baseGetQuestionMarks,
  getTotalMarks,
  getScore as baseGetScore,
  getPerformanceLevel,
} from './scoreCalculations'

export {
  calculateStreakData,
  getStreakMotivation,
  getAchievementBadges,
} from './streakCalculations'
export {
  analyzeSectionPerformance,
  calculateOverallStats,
  calculateAnalysis,
  createResponsesMap,
} from './resultAnalysis'

export { getTotalMarks, getPerformanceLevel }
