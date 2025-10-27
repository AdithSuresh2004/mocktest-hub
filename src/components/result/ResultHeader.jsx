import { FaTrophy } from 'react-icons/fa'

const ResultHeader = ({ examName }) => {
  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-center shadow-xl sm:mb-8 sm:p-6 dark:from-blue-700 dark:to-indigo-800">
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 sm:mb-4 sm:h-20 sm:w-20">
        <FaTrophy className="h-8 w-8 text-white sm:h-10 sm:w-10" />
      </div>
      <h1 className="mb-1 text-2xl font-bold text-white sm:text-4xl">
        Test Result
      </h1>
      <p className="text-sm text-blue-100 sm:text-lg">{examName}</p>
    </div>
  )
}

export default ResultHeader
