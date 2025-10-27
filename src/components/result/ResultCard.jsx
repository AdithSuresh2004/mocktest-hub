const ResultCard = ({
  children,
  className = '',
  title,
  icon: Icon,
  iconBgColor = 'bg-gray-100 dark:bg-gray-700',
  iconColor = 'text-gray-600 dark:text-gray-300',
}) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {title && (
        <div className="flex items-center border-b border-gray-200 p-3 dark:border-gray-700 sm:p-4">
          {Icon && (
            <div
              className={`mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg sm:mr-4 sm:h-10 sm:w-10 ${iconBgColor}`}
            >
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
            </div>
          )}
          <h2 className="text-base font-semibold text-gray-800 sm:text-lg dark:text-gray-100">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  )
}

export default ResultCard
