import { Link } from 'react-router-dom'
import {
  FaBookOpen,
  FaPlayCircle,
  FaChartBar,
  FaBullseye,
} from 'react-icons/fa'

const QuickActions = ({ stats, focusExams }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Quick Actions
      </h3>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Jump to the most important tasks
      </p>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <Link
          to="/exams"
          className="group flex transform items-center justify-center rounded-xl bg-gradient-to-r p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl from-blue-500 to-blue-600"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaBookOpen className="text-blue-200" size={20} />
            </span>
            <span className="text-sm font-semibold">Browse Exams</span>
          </div>
        </Link>

        <Link
          to="/pending"
          className="group flex transform items-center justify-center rounded-xl bg-gradient-to-r p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl from-green-500 to-green-600"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaPlayCircle className="text-green-200" size={20} />
            </span>
            <span className="text-sm font-semibold">Resume Test</span>
          </div>
        </Link>

        <Link
          to="/attempts"
          className="group flex transform items-center justify-center rounded-xl bg-gradient-to-r p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl from-purple-500 to-purple-600"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaChartBar className="text-purple-200" size={20} />
            </span>
            <span className="text-sm font-semibold">View Results</span>
          </div>
        </Link>

        <Link
          to="/settings"
          className="group flex transform items-center justify-center rounded-xl bg-gradient-to-r p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl from-orange-500 to-orange-600"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaBullseye className="text-orange-200" size={20} />
            </span>
            <span className="text-sm font-semibold">Settings</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default QuickActions
