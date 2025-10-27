const StatTile = ({
  icon: Icon,
  label,
  value,
  iconBgColor,
  iconColor,
  valueColor,
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-4 ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        {Icon && (
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${iconBgColor}`}
          >
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            {label}
          </p>
          <p
            className={`mt-0.5 truncate text-xl font-bold sm:mt-1 sm:text-2xl ${valueColor || 'text-gray-900 dark:text-gray-100'}`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatTile
