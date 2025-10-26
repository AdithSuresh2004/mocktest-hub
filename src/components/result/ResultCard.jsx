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
        <div className="flex items-center border-b border-gray-200 p-4 dark:border-gray-700">
          {Icon && (
            <div
              className={`mr-4 flex h-10 w-10 items-center justify-center rounded-lg ${iconBgColor}`}
            >
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          )}
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}

export default ResultCard
