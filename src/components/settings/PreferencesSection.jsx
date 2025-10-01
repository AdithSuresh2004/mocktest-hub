export default function PreferencesSection({ notifications, autoSave, onNotificationsChange, onAutoSaveChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Preferences
      </h2>
      <div className="space-y-4">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">Notifications</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Receive exam reminders and updates</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => onNotificationsChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">Auto-save Progress</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Automatically save your exam progress</p>
          </div>
          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => onAutoSaveChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  );
}