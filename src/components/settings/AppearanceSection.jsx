import { FaCog, FaMoon, FaSun } from "react-icons/fa";
export default function AppearanceSection({ theme, onThemeChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <FaCog className="w-5 h-5" />
        Appearance
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onThemeChange('light')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaSun className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Light</span>
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaMoon className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark</span>
          </button>
          <button
            onClick={() => onThemeChange('system')}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              theme === 'system'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaCog className="w-6 h-6 text-gray-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">System</span>
          </button>
        </div>
      </div>
    </div>
  );
}