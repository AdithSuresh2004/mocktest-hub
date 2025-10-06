import { memo } from 'react'

/**
 * Reusable StatCard component for metric displays
 * Consolidates duplicate stat card patterns from ResultPage, DashboardPage
 */
const StatCard = memo(
  ({ icon: Icon, label, value, color = 'blue', variant = 'gradient' }) => {
    const colorSchemes = {
      blue: {
        border: 'border-blue-200 dark:border-blue-700',
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
        text: 'text-blue-900 dark:text-blue-100',
        iconColor: 'text-blue-500 dark:text-blue-400',
      },
      green: {
        border: 'border-green-200 dark:border-green-700',
        bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
        text: 'text-green-900 dark:text-green-100',
        iconColor: 'text-green-500 dark:text-green-400',
      },
      purple: {
        border: 'border-purple-200 dark:border-purple-700',
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
        text: 'text-purple-900 dark:text-purple-100',
        iconColor: 'text-purple-500 dark:text-purple-400',
      },
      yellow: {
        border: 'border-yellow-200 dark:border-yellow-700',
        bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
        text: 'text-yellow-900 dark:text-yellow-100',
        iconColor: 'text-yellow-500 dark:text-yellow-400',
      },
      red: {
        border: 'border-red-200 dark:border-red-700',
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-900 dark:text-red-100',
        iconColor: 'text-red-500 dark:text-red-400',
      },
      gray: {
        border: 'border-gray-200 dark:border-gray-600',
        bg: 'bg-gray-50 dark:bg-gray-700/50',
        text: 'text-gray-900 dark:text-gray-100',
        iconColor: 'text-gray-500 dark:text-gray-400',
      },
    }

    const scheme = colorSchemes[color] || colorSchemes.blue

    return (
      <div
        className={`rounded-xl border ${scheme.border} ${scheme.bg} p-4 text-center`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className={`text-sm font-medium ${scheme.text}`}>{label}</span>
          {Icon && <Icon className={scheme.iconColor} />}
        </div>
        <p className={`text-2xl font-bold ${scheme.text}`}>{value}</p>
      </div>
    )
  }
)

StatCard.displayName = 'StatCard'

export default StatCard
