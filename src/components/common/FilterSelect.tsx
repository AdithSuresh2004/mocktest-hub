import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";

interface OptionObject {
  value: string | number;
  label: string;
}

type FilterOption = string | number | OptionObject;

interface FilterSelectProps {
  label?: string;
  value: string | number;
  options: FilterOption[];
  onChange: (newValue: string | number) => void;
  className?: string;
  disabled?: boolean;
}

const isOptionObject = (option: FilterOption): option is OptionObject => {
  return (
    typeof option === "object" &&
    option !== null &&
    "value" in option &&
    "label" in option
  );
};

const FilterSelect = forwardRef<HTMLSelectElement, FilterSelectProps>(
  ({ label, value, options, onChange, className = "", disabled }, ref) => {
    const id = useId();
    const selectId = `filter-select-${id}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    };

    const baseSelectClasses =
      "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100";

    return (
      <div className={cn("w-full sm:w-auto", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={baseSelectClasses}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          {options.map((option, index) => {
            const optionValue = isOptionObject(option)
              ? option.value
              : String(option);
            const optionLabel = isOptionObject(option)
              ? option.label
              : String(option);

            return (
              <option key={`${optionValue}-${index}`} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
);

FilterSelect.displayName = "FilterSelect";

export default FilterSelect;
