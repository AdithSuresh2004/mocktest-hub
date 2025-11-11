import Button from "@/components/common/Button";

interface ExamNavigationProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit?: () => void;
}

const ExamNavigation = ({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onSubmit,
}: ExamNavigationProps) => {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg dark:border-gray-800 dark:bg-gray-800/95">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 sm:gap-8">
        <Button
          onClick={onPrev}
          disabled={!canGoPrev}
          variant="secondary"
          size="lg"
          className="flex-1 sm:flex-none"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            onSubmit?.();
          }}
          variant="danger"
          size="lg"
          className="flex-none px-8 py-3"
        >
          Submit
        </Button>
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
  );
};

export default ExamNavigation;
