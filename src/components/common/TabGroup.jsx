const TabGroup = ({ 
  tabs, 
  activeTab, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between md:justify-start">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-4 text-center text-sm font-medium transition-all duration-200 md:flex-initial md:flex-grow ${
                  isActive
                    ? 'border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-300'
                }`}
              >
                {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                <span
                  className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                    isActive ? 'inline' : 'hidden md:inline'
                  }`}
                >
                  {tab.label}
                </span>
                {tab.count !== undefined && (
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TabGroup

