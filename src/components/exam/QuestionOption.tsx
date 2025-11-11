import FormattedContent from "@/components/common/FormattedContent";
import { EXAM_QUESTION_STYLES } from "@/constants/examUI";
import { cn } from "@/utils/cn";
import type { Option } from "@/types";

interface QuestionOptionProps {
  option: Option;
  optionId: string;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  questionId: string;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

const QuestionOption = ({
  option,
  optionId,
  isSelected,
  onSelect,
  questionId,
  index,
  className,
  style,
}: QuestionOptionProps) => {
  const optionLabel = String.fromCharCode(65 + index);
  const optionStyles = EXAM_QUESTION_STYLES.option;

  return (
    <label
      className={cn(
        "group block cursor-pointer rounded-lg border p-4 transition-all duration-200",
        isSelected ? optionStyles.selected : optionStyles.unselected,
        className,
      )}
      style={style}
    >
      <input
        type="radio"
        name={`question-${questionId}`}
        value={optionId}
        checked={isSelected}
        onChange={() => onSelect(optionId)}
        aria-label={`Option ${optionLabel}: ${option.text}`}
        className="sr-only"
      />
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 font-bold transition-all duration-200",
            isSelected
              ? optionStyles.circle.selected
              : optionStyles.circle.unselected,
          )}
          aria-hidden="true"
        >
          {optionLabel}
        </div>
        <div className="flex-1">
          <FormattedContent
            text={option.text}
            className="text-base text-gray-800 dark:text-gray-200"
          />
          {option.image && (
            <div className="mt-3">
              <img
                src={option.image}
                alt={`Option ${optionLabel} illustration`}
                className="h-auto max-w-full rounded-md border border-gray-300 dark:border-gray-600"
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </label>
  );
};

export default QuestionOption;
