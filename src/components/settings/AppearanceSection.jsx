import { FaCog, FaMoon, FaSun, FaDesktop } from 'react-icons/fa'

const AppearanceSection = ({ theme, onThemeChange }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <FaCog className="h-5 w-5" />
        Appearance
      </h2>
      <div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onThemeChange('light')}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <FaSun className="h-6 w-6 text-yellow-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Light
            </span>
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <FaMoon className="h-6 w-6 text-blue-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Dark
            </span>
          </button>
          <button
            onClick={() => onThemeChange('system')}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
              theme === 'system'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <FaDesktop className="h-6 w-6 text-purple-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              System
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppearanceSection
