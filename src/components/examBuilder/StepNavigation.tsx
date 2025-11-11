interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isValidating?: boolean;
  canProceed?: boolean;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isValidating = false,
  canProceed = true,
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        disabled={isFirstStep}
        className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentStep
                ? "bg-blue-600 dark:bg-blue-400"
                : index < currentStep
                  ? "bg-green-600 dark:bg-green-400"
                  : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>

      {!isLastStep ? (
        <button
          onClick={onNext}
          disabled={isValidating || !canProceed}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-500"
        >
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={isValidating || !canProceed}
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-green-500"
        >
          {isValidating ? "Creating..." : "Create Exam"}
        </button>
      )}
    </div>
  );
};
