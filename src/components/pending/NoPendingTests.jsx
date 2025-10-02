import { useNavigate } from 'react-router-dom'
import { FaHourglassHalf } from 'react-icons/fa'

export default function NoPendingTests() {
  const navigate = useNavigate()
  return (
    <div className="p-12 text-center border border-gray-200 rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <FaHourglassHalf className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        No Pending Tests
      </h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        You don't have any incomplete exams at the moment
      </p>
      <button
        onClick={() => navigate('/exams')}
        className="inline-flex items-center px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Browse Exams
      </button>
    </div>
  )
}
