import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches)

  const handleToggle = () => {
    // Simply toggle between actual light and dark modes
    // Always switch to the opposite of what the user currently sees
    if (isDark) {
      toggleTheme('light')
    } else {
      toggleTheme('dark')
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="cursor-pointer rounded-md border border-gray-200 p-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
    </button>
  )
}
