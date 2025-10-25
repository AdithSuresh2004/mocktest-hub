import {
  TEST_TYPE_CONFIG,
  DEFAULT_TEST_CONFIG,
  DIFFICULTY_LEVELS,
  DIFFICULTY_COLORS,
  DIFFICULTY_BADGE_COLORS,
  DEFAULT_DIFFICULTY_COLOR,
  PERFORMANCE_THRESHOLDS,
  PERFORMANCE_COLORS,
} from '@/constants/testConfig'

export const getTestTypeConfig = (type) =>
  TEST_TYPE_CONFIG[type] || DEFAULT_TEST_CONFIG

export const normalizeDifficulty = (strength) => {
  if (!strength) return DIFFICULTY_LEVELS.MEDIUM
  return strength.toLowerCase()
}

export const getDifficultyColor = (strength) => {
  const normalized = normalizeDifficulty(strength)
  return DIFFICULTY_COLORS[normalized] || DEFAULT_DIFFICULTY_COLOR
}

export const getDifficultyBadgeColor = (strength) => {
  const normalized = normalizeDifficulty(strength)
  return DIFFICULTY_BADGE_COLORS[normalized] || DEFAULT_DIFFICULTY_COLOR
}

export const capitalizeStrength = (strength) => {
  if (!strength) return 'Medium'
  return strength.charAt(0).toUpperCase() + strength.slice(1).toLowerCase()
}

export const getPerformanceColor = (score, total) => {
  const percentage = total > 0 ? (score / total) * 100 : 0
  if (percentage >= PERFORMANCE_THRESHOLDS.EXCELLENT)
    return PERFORMANCE_COLORS.EXCELLENT
  if (percentage >= PERFORMANCE_THRESHOLDS.GOOD) return PERFORMANCE_COLORS.GOOD
  if (percentage >= PERFORMANCE_THRESHOLDS.AVERAGE)
    return PERFORMANCE_COLORS.AVERAGE
  return PERFORMANCE_COLORS.POOR
}

export const calculatePercentage = (score, total) => {
  if (total === 0) return 0
  return Math.round((score / total) * 100 * 100) / 100
}
