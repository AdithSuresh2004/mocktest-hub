export default function ExamNavigation({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <footer className="z-10 border-t border-gray-200 bg-white px-4 py-3 shadow-lg transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`rounded-lg px-6 py-2 font-medium shadow-sm transition-all duration-200 ${
            canGoPrev
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              : 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50 dark:bg-gray-700/50 dark:text-gray-500'
          }`}
        >
          Previous
        </button>
        <button
          onClick={onSubmit}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
        >
          Submit
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`rounded-lg px-6 py-2 font-medium shadow-sm transition-all duration-200 ${
            canGoNext
              ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
              : 'cursor-not-allowed bg-green-400/50 text-white/70 opacity-50'
          }`}
        >
          Next
        </button>
      </div>
    </footer>
  )
}
