export default function ExamNavigation({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6 sm:py-5 z-10 flex-shrink-0">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 max-w-6xl mx-auto">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-medium text-base transition-all duration-200 flex-1 sm:flex-none ${canGoPrev
              ? "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600 dark:opacity-50"
            }`}
        >
          Previous
        </button>
        {canGoNext && (
          <button
            onClick={onNext}
            className="px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-medium text-base transition-all duration-200 bg-green-700 hover:bg-green-800 text-white shadow-sm"
          >
            Next
          </button>
        )}
        <button
          onClick={onSubmit}
          className="px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-base transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}