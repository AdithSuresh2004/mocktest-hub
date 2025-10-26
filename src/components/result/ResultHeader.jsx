import { FaTrophy } from 'react-icons/fa'

const ResultHeader = ({ examName }) => {
  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
      <div className="text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
          <FaTrophy className="h-10 w-10 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Exam Completed!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{examName}</p>
      </div>
    </div>
  )
}

export default ResultHeader
