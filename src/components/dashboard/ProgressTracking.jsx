import {
  FaBullseye,
  FaChartLine,
  FaCalendarAlt,
  FaFire,
  FaTrophy,
  FaCalendarDay,
  FaStar,
} from 'react-icons/fa'
import MetricCard from '@/components/dashboard/MetricCard'
import {
  calculateStreakData,
  getStreakMotivation,
  getAchievementBadges,
} from '@/utils/calculations/streakCalculations'

const ProgressTracking = ({ stats, streakGoals }) => {
  if (!stats) return null

  const completionRate =
    stats.totalExams > 0
      ? ((stats.completedTests / stats.totalExams) * 100).toFixed(0)
      : 0

  const currentStreakGoals = streakGoals || {
    daily: 3,
    weekly: 15,
    monthly: 60,
  }

  const weeklyGoal = Math.min(
    currentStreakGoals.weekly,
    currentStreakGoals.daily * 7
  )
  const monthlyGoal = Math.min(
    currentStreakGoals.monthly,
    currentStreakGoals.daily * 30
  )

  const streakData = calculateStreakData()

  const todayProgress = Math.min(
    (streakData.today / currentStreakGoals.daily) * 100,
    100
  )
  const weeklyProgress = Math.min((streakData.week / weeklyGoal) * 100, 100)
  const monthlyProgress = Math.min((streakData.month / monthlyGoal) * 100, 100)

  const achievementBadges = getAchievementBadges(streakData, stats)
  const motivationMessage = getStreakMotivation(streakData.current)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 h-full">
      <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Your Progress
      </h3>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Personalized goals and streak tracking
      </p>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FaFire className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {streakData.current}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Day Streak
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Longest: {streakData.longest} days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaCalendarDay className="h-3 w-3" />
              Today's Goal
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {streakData.today}/{currentStreakGoals.daily}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                todayProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${todayProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Weekly Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {streakData.week}/{weeklyGoal}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                weeklyProgress === 100 ? 'bg-green-500' : 'bg-purple-500'
              }`}
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {streakData.month}/{monthlyGoal}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                monthlyProgress === 100 ? 'bg-green-500' : 'bg-pink-500'
              }`}
              style={{ width: `${monthlyProgress}%` }}
            />
          </div>
        </div>

        <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <FaFire className="inline h-3 w-3 text-orange-500 mr-1" />
            {motivationMessage}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProgressTracking
