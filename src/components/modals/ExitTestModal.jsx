import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { HiInformationCircle } from "react-icons/hi2";
export default function ExitTestModal({
  hasAnswers,
  onSaveAndExit,
  onExitWithoutSaving,
  onCancel,
}) {
  const exitButtonClasses =
    "w-full px-4 py-3 rounded-lg font-medium transition-colors bg-red-600 hover:bg-red-700 text-white";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
            <HiOutlineExclamationTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Exit Exam?
          </h3>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {hasAnswers
              ? "You have answered some questions. What would you like to do with your progress?"
              : "Are you sure you want to exit the exam?"}
          </p>
          {hasAnswers && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Save Progress & Exit
            </button>
          )}
          <button onClick={onExitWithoutSaving} className={exitButtonClasses}>
            {hasAnswers ? "Exit Without Saving" : "Exit Exam"}
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Exam
          </button>
        </div>
      </div>
    </div>
  );
}