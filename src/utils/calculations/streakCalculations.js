import { getAllAttempts } from '@/data/attemptRepository'
import {
  getDateKey,
  getStartOfDay,
  getStartOfWeek,
  getStartOfMonth,
} from '@/utils/helpers/dateHelpers'

export function calculateStreakData() {
  const attempts = getAllAttempts()
    .filter((attempt) => attempt.status === 'completed')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  const uniqueDates = [
    ...new Set(attempts.map((a) => getDateKey(a.timestamp))),
  ].sort()

  if (uniqueDates.length === 0) {
    return { current: 0, longest: 0, today: 0, week: 0, month: 0 }
  }

  let longestStreak = 0
  let currentStreak = 0
  for (let i = 0; i < uniqueDates.length; i++) {
    currentStreak++
    if (i + 1 < uniqueDates.length) {
      const currentDay = new Date(uniqueDates[i])
      const nextDay = new Date(uniqueDates[i + 1])
      const diff = nextDay.getTime() - currentDay.getTime()
      if (diff > 24 * 60 * 60 * 1000) {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak
        }
        currentStreak = 0
      }
    }
  }
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak
  }

  let isTodayInStreak = false
  const todayKey = getDateKey(new Date())
  if (uniqueDates.includes(todayKey)) {
    isTodayInStreak = true
  }

  let finalCurrentStreak = 0
  if (isTodayInStreak) {
    finalCurrentStreak = currentStreak
  } else {
    const yesterdayKey = getDateKey(
      new Date(new Date().setDate(new Date().getDate() - 1))
    )
    if (!uniqueDates.includes(yesterdayKey)) {
      finalCurrentStreak = 0
    } else {
      finalCurrentStreak = currentStreak
    }
  }

  const today = getStartOfDay()
  const todayAttempts = attempts.filter(
    (attempt) => new Date(attempt.timestamp) >= today
  ).length

  const weekStart = getStartOfWeek(today)
  const weekAttempts = attempts.filter(
    (attempt) => new Date(attempt.timestamp) >= weekStart
  ).length

  const monthStart = getStartOfMonth(today)
  const monthAttempts = attempts.filter(
    (attempt) => new Date(attempt.timestamp) >= monthStart
  ).length

  return {
    current: finalCurrentStreak,
    longest: longestStreak,
    today: todayAttempts,
    week: weekAttempts,
    month: monthAttempts,
  }
}

export function getStreakMotivation(currentStreak) {
  if (currentStreak >= 30) return "🔥 Legendary Scholar! You're unstoppable!"
  if (currentStreak >= 14) return "🎯 Month Warrior! You're on fire!"
  if (currentStreak >= 7) return '🏆 Week Champion! Keep the momentum!'
  if (currentStreak >= 3) return '⏰ Daily Hero! Maintain your focus!'
  if (currentStreak >= 1) return "🚀 Getting Started! Let's build a habit!"
  return '🌱 Ready to Begin! Start your streak today!'
}

export function getAchievementBadges(streakData, stats) {
  const badges = []

  if (stats.completedTests >= 5) {
    badges.push({
      icon: '🏁',
      name: 'First Steps',
      description: 'Completed 5 tests',
    })
  }

  if (stats.completedTests >= 25) {
    badges.push({
      icon: '🎓',
      name: 'Dedicated Learner',
      description: 'Completed 25 tests',
    })
  }

  if (stats.completedTests >= 50) {
    badges.push({
      icon: '💎',
      name: 'Master Student',
      description: 'Completed 50 tests',
    })
  }

  if (streakData.longest >= 7) {
    badges.push({
      icon: '🔥',
      name: 'Week Warrior',
      description: '7+ day streak',
    })
  }

  if (streakData.longest >= 30) {
    badges.push({
      icon: '👑',
      name: 'Consistency King',
      description: '30+ day streak',
    })
  }

  if (stats.averageScore >= 80) {
    badges.push({
      icon: '🎯',
      name: 'High Achiever',
      description: 'Avg score 80%+',
    })
  }

  return badges
}
