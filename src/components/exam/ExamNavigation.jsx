import Button from '@/components/common/Button'

export default function ExamNavigation({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg dark:border-gray-800 dark:bg-gray-800/95">
      <div className="mx-auto flex max-w-4xl items-center gap-3 sm:gap-8">
        <Button
          onClick={onPrev}
          disabled={!canGoPrev}
          variant="secondary"
          size="lg"
          className="flex-1 sm:flex-none"
        >
          Previous
        </Button>
        <div className="flex-1" />
        <Button
          onClick={onSubmit}
          variant="danger"
          size="lg"
          className="flex-none px-8 py-3 mx-2"
        >
          Submit
        </Button>
        <div className="flex-1" />
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          variant="primary"
          size="lg"
          className="flex-1 sm:flex-none"
        >
          Next
        </Button>
      </div>
    </footer>
  )
}
