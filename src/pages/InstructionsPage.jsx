import {
  FaCheckCircle,
  FaKeyboard,
  FaClock,
  FaListAlt,
  FaExclamationTriangle,
} from 'react-icons/fa'

const InstructionsPage = ({ exam, onStart }) => {
  if (!exam) return null
  const totalQuestions =
    exam.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-colors duration-200 dark:bg-gray-900">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg transition-colors duration-200 2xl:max-w-6xl dark:bg-gray-800">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {exam.exam_name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Please read the instructions carefully before starting the exam
          </p>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="mb-2 flex items-center gap-2">
              <FaClock className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Duration
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {exam.duration_minutes} minutes
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
            <div className="mb-2 flex items-center gap-2">
              <FaListAlt className="text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Total Questions
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {totalQuestions} questions
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <div className="mb-2 flex items-center gap-2">
              <FaCheckCircle className="text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Total Marks
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {exam.total_marks} marks
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
            <div className="mb-2 flex items-center gap-2">
              <FaExclamationTriangle className="text-orange-600 dark:text-orange-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Sections
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {exam.sections?.length || 0} sections
            </p>
          </div>
        </div>
        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            General Instructions:
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="font-semibold">1.</span>
              <p>
                The exam will start as soon as you click the "Start Exam" button
                below.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">2.</span>
              <p>The timer will start automatically and cannot be paused.</p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">3.</span>
              <p>
                You can navigate between questions using the navigation panel on
                the right.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">4.</span>
              <p>You can mark questions for review and return to them later.</p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">5.</span>
              <p>The exam will automatically submit when time runs out.</p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">6.</span>
              <p>
                Make sure you have a stable internet connection throughout the
                exam.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
          <div className="mb-3 flex items-center gap-2">
            <FaKeyboard className="text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Keyboard Shortcuts:
            </h3>
          </div>
          <div className="grid gap-2 text-sm text-gray-700 md:grid-cols-2 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Next Question:</span>
              <kbd className="rounded bg-white px-2 py-1 font-mono shadow dark:bg-gray-600">
                →
              </kbd>
            </div>
            <div className="flex justify-between">
              <span>Previous Question:</span>
              <kbd className="rounded bg-white px-2 py-1 font-mono shadow dark:bg-gray-600">
                ←
              </kbd>
            </div>
            <div className="flex justify-between">
              <span>Mark for Review:</span>
              <kbd className="rounded bg-white px-2 py-1 font-mono shadow dark:bg-gray-600">
                M
              </kbd>
            </div>
            <div className="flex justify-between">
              <span>Fullscreen:</span>
              <kbd className="rounded bg-white px-2 py-1 font-mono shadow dark:bg-gray-600">
                F
              </kbd>
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="mt-1 text-yellow-600 dark:text-yellow-400" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold">Important:</p>
              <p>
                Once you start the exam, you cannot restart it. Make sure you
                are ready before clicking "Start Exam".
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="rounded-lg border-2 border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onStart}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstructionsPage
