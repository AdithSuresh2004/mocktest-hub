const PreferencesSection = ({
  notifications,
  autoSave,
  onNotificationsChange,
  onAutoSaveChange,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Preferences
      </h2>
      <div className="space-y-4">
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
    </div>
  )
}

export default PreferencesSection
