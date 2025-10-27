import Button from '@/components/common/Button'

export default function ExamNavigation({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <footer className="border-t border-blue-200 bg-white px-3 py-2 shadow-md backdrop-blur-sm sm:px-4 sm:py-3 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 sm:gap-3">
        <Button
          onClick={onPrev}
          disabled={!canGoPrev}
          variant="secondary"
          className="text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </Button>
        <Button
          onClick={onSubmit}
          variant="primary"
          className="text-sm sm:text-base"
        >
          Submit
        </Button>
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          variant="success"
          className="text-sm sm:text-base"
        >
          Next
        </Button>
      </div>
    </footer>
  )
}
