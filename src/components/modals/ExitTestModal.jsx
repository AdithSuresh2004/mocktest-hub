import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { HiInformationCircle } from 'react-icons/hi2'
export default function ExitTestModal({
  hasAnswers,
  onSaveAndExit,
  onExitWithoutSaving,
  onCancel,
}) {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            <HiOutlineExclamationTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Exit Exam?
          </h3>
        </div>
        <div className="mb-6">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {hasAnswers
              ? 'You have answered some questions. What would you like to do with your progress?'
              : 'Are you sure you want to exit the exam?'}
          </p>
          {hasAnswers && (
            <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-4 dark:bg-blue-900/30">
              <div className="flex">
                <div className="flex-shrink-0">
                  <HiInformationCircle className="h-5 w-5 text-blue-400 dark:text-blue-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your progress will be saved and you can resume later from
                    where you left off.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {hasAnswers && (
            <button
              onClick={onSaveAndExit}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Save Progress & Exit
            </button>
          )}
          <button
            onClick={onExitWithoutSaving}
            className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700"
          >
            {hasAnswers ? 'Exit Without Saving' : 'Exit Exam'}
          </button>
          <button
            onClick={onCancel}
            className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Continue Exam
          </button>
        </div>
      </div>
    </div>
  )
}
