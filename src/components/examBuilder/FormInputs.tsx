import { cn } from "@/utils/cn";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  className?: string;
  name?: string;
  id?: string;
}

export const TextInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  type = "text",
  className,
  name,
  id,
}: TextInputProps) => {
  const fieldId = id || name || label.toLowerCase().replace(/\s+/g, "_");
  const fieldName = name || fieldId;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={fieldId}
        name={fieldName}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:ring-offset-0 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600",
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
  name?: string;
  id?: string;
}

export const NumberInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  min,
  max,
  className,
  name,
  id,
}: NumberInputProps) => {
  const fieldId = id || name || label.toLowerCase().replace(/\s+/g, "_");
  const fieldName = name || fieldId;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={fieldId}
        name={fieldName}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:ring-offset-0 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600",
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export const SelectInput = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className,
  name,
  id,
}: SelectInputProps) => {
  const fieldId = id || name || label.toLowerCase().replace(/\s+/g, "_");
  const fieldName = name || fieldId;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <select
        id={fieldId}
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 transition-colors focus:ring-2 focus:ring-offset-0 focus:outline-none dark:bg-gray-800 dark:text-gray-100",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  name?: string;
  id?: string;
}

export const TextArea = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  className,
  name,
  id,
}: TextAreaProps) => {
  const fieldId = id || name || label.toLowerCase().replace(/\s+/g, "_");
  const fieldName = name || fieldId;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <textarea
        id={fieldId}
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:ring-offset-0 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600",
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
