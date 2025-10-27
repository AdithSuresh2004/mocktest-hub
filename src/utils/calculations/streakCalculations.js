import { getAllAttempts } from '@/data/attemptRepository'
import { getDateKey, getStartOfDay, getStartOfWeek, getStartOfMonth } from '@/utils/helpers/dateHelpers'

export function calculateStreakData() {
  const attempts = getAllAttempts()
    .filter(attempt => attempt.status === 'completed')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  if (attempts.length === 0) {
    return {
      current: 0,
      longest: 0,
      today: 0,
      week: 0,
      month: 0
    }
  }

  const today = getStartOfDay()
  let currentStreak = 0
  let currentDate = new Date(today)

  const dateExists = {}
  attempts.forEach(attempt => {
    const dateKey = getDateKey(attempt.timestamp)
    dateExists[dateKey] = true
  })

  while (true) {
    const dateKey = getDateKey(currentDate)
    if (dateExists[dateKey]) {
      currentStreak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  let longestStreak = 0
  let tempStreak = 0

  attempts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  for (let i = 0; i < attempts.length; i++) {
    const currentDate = new Date(attempts[i].timestamp)
    const previousDate = i > 0 ? new Date(attempts[i - 1].timestamp) : null

    if (!previousDate ||
      (currentDate.getTime() - previousDate.getTime()) <= 24 * 60 * 60 * 1000) {
      tempStreak++
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak)

  const todayAttempts = attempts.filter(attempt =>
    new Date(attempt.timestamp) >= today
  ).length

  const weekStart = getStartOfWeek(today)
  const weekAttempts = attempts.filter(attempt =>
    new Date(attempt.timestamp) >= weekStart
  ).length

  const monthStart = getStartOfMonth(today)
  const monthAttempts = attempts.filter(attempt =>
    new Date(attempt.timestamp) >= monthStart
  ).length

  return {
    current: currentStreak,
    longest: longestStreak,
    today: todayAttempts,
    week: weekAttempts,
    month: monthAttempts
  }
}

export function getStreakMotivation(currentStreak) {
  if (currentStreak >= 30) return "🔥 Legendary Scholar! You're unstoppable!"
  if (currentStreak >= 14) return "🎯 Month Warrior! You're on fire!"
  if (currentStreak >= 7) return "🏆 Week Champion! Keep the momentum!"
  if (currentStreak >= 3) return "⏰ Daily Hero! Maintain your focus!"
  if (currentStreak >= 1) return "🚀 Getting Started! Let's build a habit!"
  return "🌱 Ready to Begin! Start your streak today!"
}

export function getAchievementBadges(streakData, stats) {
  const badges = []

  if (stats.completedTests >= 5) {
    badges.push({
      icon: '🏁',
      name: 'First Steps',
      description: 'Completed 5 tests'
    })
  }

  if (stats.completedTests >= 25) {
    badges.push({
      icon: '🎓',
      name: 'Dedicated Learner',
      description: 'Completed 25 tests'
    })
  }

  if (stats.completedTests >= 50) {
    badges.push({
      icon: '💎',
      name: 'Master Student',
      description: 'Completed 50 tests'
    })
  }

  if (streakData.longest >= 7) {
    badges.push({
      icon: '🔥',
      name: 'Week Warrior',
      description: '7+ day streak'
    })
  }

  if (streakData.longest >= 30) {
    badges.push({
      icon: '👑',
      name: 'Consistency King',
      description: '30+ day streak'
    })
  }

  if (stats.averageScore >= 80) {
    badges.push({
      icon: '🎯',
      name: 'High Achiever',
      description: 'Avg score 80%+'
    })
  }

  return badges
}
