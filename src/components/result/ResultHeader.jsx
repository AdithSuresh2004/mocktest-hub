import { FaTrophy } from 'react-icons/fa'

const ResultHeader = ({ examName }) => {
  return (
    <div
      className="mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-center shadow-xl dark:from-blue-700 dark:to-indigo-800"
    >
      <div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20"
      >
        <FaTrophy className="h-10 w-10 text-white" />
      </div>
      <h1 className="mb-1 text-4xl font-bold text-white">Test Result</h1>
      <p className="text-lg text-blue-100">{examName}</p>
    </div>
  )
}

export default ResultHeader
