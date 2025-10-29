const MetricCard = ({
  icon: Icon,
  label,
  value,
  suffix = '',
  color = 'blue',
  variant = 'standard',
}) => {
  const colorClasses = {
    blue: {
      bg: `bg-blue-100 dark:bg-blue-900/50`,
      icon: `text-blue-600 dark:text-blue-400`,
    },
    green: {
      bg: `bg-green-100 dark:bg-green-900/50`,
      icon: `text-green-600 dark:text-green-400`,
    },
    purple: {
      bg: `bg-purple-100 dark:bg-purple-900/50`,
      icon: `text-purple-600 dark:text-purple-400`,
    },
    yellow: {
      bg: `bg-yellow-100 dark:bg-yellow-900/50`,
      icon: `text-yellow-600 dark:text-yellow-400`,
    },
    red: {
      bg: `bg-red-100 dark:bg-red-900/50`,
      icon: `text-red-600 dark:text-red-400`,
    },
  }

  const theme = colorClasses[color] || colorClasses.blue

  const variantClasses = {
    standard:
      'flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50',
    compact:
      'flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-700/50',
    prominent:
      'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
  }

  const baseClass = variantClasses[variant] || variantClasses.standard

  if (variant === 'prominent') {
    return (
      <div className={baseClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {value}
              {suffix}
            </p>
          </div>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-lg ${theme.bg}`}
          >
            <Icon className={`h-7 w-7 ${theme.icon}`} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={baseClass}>
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${theme.bg}`}
      >
        <Icon className={`h-6 w-6 ${theme.icon}`} />
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {value}
          {suffix}
        </p>
      </div>
    </div>
  )
}

export default MetricCard
