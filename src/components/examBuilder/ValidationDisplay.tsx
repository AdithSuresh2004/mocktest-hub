import { ValidationError } from "@/types/examBuilder";
import { formatValidationError } from "@/utils/validation/examBuilderValidator";
import { MdWarning, MdCheckCircle } from "react-icons/md";

interface ValidationDisplayProps {
  errors: ValidationError[];
  isValid: boolean;
  title?: string;
}

export const ValidationDisplay = ({
  errors,
  isValid,
  title = "Validation",
}: ValidationDisplayProps) => {
  if (isValid && errors.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900/20">
        <MdCheckCircle
          className="text-green-600 dark:text-green-400"
          size={24}
        />
        <p className="text-green-700 dark:text-green-300">
          All validations passed!
        </p>
      </div>
    );
  }

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900/20">
      <div className="flex items-center gap-2">
        <MdWarning className="text-red-600 dark:text-red-400" size={20} />
        <h3 className="font-semibold text-red-800 dark:text-red-300">
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {errors.map((error, index) => (
          <li key={index} className="text-sm text-red-700 dark:text-red-400">
            <span className="font-medium">{formatValidationError(error)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
