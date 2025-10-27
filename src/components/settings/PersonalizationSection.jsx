import {
  FaHeart,
  FaBolt,
  FaEye,
  FaClock,
  FaTrophy,
  FaChartBar,
} from 'react-icons/fa'

const PersonalizationSection = ({
  focusExams,
  dashboardWidgets,
  onFocusExamsChange,
  onDashboardWidgetsChange,
}) => {
  const handleWidgetToggle = (widgetId) => {
    onDashboardWidgetsChange({
      ...dashboardWidgets,
      [widgetId]: !dashboardWidgets[widgetId],
    })
  }

  const widgetOptions = [
    {
      id: 'performanceChart',
      name: 'Performance Trends Chart',
      icon: FaChartBar,
    },
    { id: 'scoreDistribution', name: 'Score Distribution', icon: FaTrophy },
    { id: 'recentActivity', name: 'Recent Activity Feed', icon: FaClock },
    { id: 'progressTracking', name: 'Progress & Streaks', icon: FaBolt },
    { id: 'performanceSnapshot', name: 'Performance Overview', icon: FaTrophy },
  ]

  return (
    <div className="space-y-8">


      {/* Dashboard Customization */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <FaEye className="h-5 w-5 text-blue-500" />
          Dashboard Widgets
        </h3>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Choose which widgets appear on your dashboard
        </p>

        <div className="grid grid-cols-1 gap-4">
          {widgetOptions.map((widget, index) => {
            const IconComponent = widget.icon
            return (
              <div
                key={widget.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {widget.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {index === 0
                        ? 'Your performance trends over time'
                        : index === 1
                          ? 'Score breakdown by ranges'
                          : index === 2
                            ? 'Recent completed tests'
                            : index === 3
                              ? 'Goals and streak tracking'
                              : 'Quick performance overview'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dashboardWidgets?.[widget.id] !== false}
                    onChange={() => handleWidgetToggle(widget.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PersonalizationSection
