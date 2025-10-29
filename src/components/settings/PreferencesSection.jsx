import { FaBell, FaSave, FaTachometerAlt, FaSlidersH } from 'react-icons/fa'

const PreferencesSection = ({
  notifications,
  autoSave,
  streakGoals,
  onNotificationsChange,
  onAutoSaveChange,
  onStreakGoalsChange,
}) => {
  const handleGoalChange = (goal, value) => {
    onStreakGoalsChange({ ...streakGoals, [goal]: Number(value) })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <FaSlidersH className="h-5 w-5 text-blue-500" />
        Preferences
      </h3>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Customize your experience
      </p>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            General
          </h3>

          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Notifications
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive exam reminders and updates
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => onNotificationsChange(e.target.checked)}
              className="h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Auto-save Progress
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically save your exam progress
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => onAutoSaveChange(e.target.checked)}
              className="h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="border-t border-gray-200 pt-6 dark:border-gray-600">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
            Streak Goals
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Daily Streak Goal (Tests per Day)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={streakGoals?.daily || 3}
                onChange={(e) => handleGoalChange('daily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="3"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Set your target number of tests to complete each day
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weekly Streak Goal (Tests per Week)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={streakGoals?.weekly || 15}
                onChange={(e) => handleGoalChange('weekly', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="15"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Set your target number of tests per week
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Streak Goal (Tests per Month)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={streakGoals?.monthly || 60}
                onChange={(e) => handleGoalChange('monthly', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="60"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Set your target number of tests per month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferencesSection
