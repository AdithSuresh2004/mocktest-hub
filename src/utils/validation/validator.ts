export type ValidationRule<T> = (value: T) => boolean | string;

export interface ValidationSchema<T> {
  [K: string]: ValidationRule<T[keyof T]>[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export const createValidator = <T extends Record<string, unknown>>(
  schema: ValidationSchema<T>,
) => {
  return (data: Partial<T>): ValidationResult => {
    const errors: Record<string, string[]> = {};

    Object.entries(schema).forEach(([field, rules]) => {
      const value = data[field as keyof T];
      const fieldErrors: string[] = [];

      rules.forEach((rule) => {
        const result = rule(value as T[keyof T]);
        if (result !== true) {
          fieldErrors.push(
            typeof result === "string" ? result : `${field} is invalid`,
          );
        }
      });

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
};

export const required = <T>(message?: string): ValidationRule<T> => {
  return (value: T) => {
    if (value === null || value === undefined || value === "") {
      return message || "This field is required";
    }
    return true;
  };
};

export const minLength = (
  length: number,
  message?: string,
): ValidationRule<string> => {
  return (value: string) => {
    if (!value || value.length < length) {
      return message || `Minimum length is ${length} characters`;
    }
    return true;
  };
};

export const maxLength = (
  length: number,
  message?: string,
): ValidationRule<string> => {
  return (value: string) => {
    if (value && value.length > length) {
      return message || `Maximum length is ${length} characters`;
    }
    return true;
  };
};

export const min = (
  minValue: number,
  message?: string,
): ValidationRule<number> => {
  return (value: number) => {
    if (value < minValue) {
      return message || `Minimum value is ${minValue}`;
    }
    return true;
  };
};

export const max = (
  maxValue: number,
  message?: string,
): ValidationRule<number> => {
  return (value: number) => {
    if (value > maxValue) {
      return message || `Maximum value is ${maxValue}`;
    }
    return true;
  };
};

export const pattern = (
  regex: RegExp,
  message?: string,
): ValidationRule<string> => {
  return (value: string) => {
    if (value && !regex.test(value)) {
      return message || "Invalid format";
    }
    return true;
  };
};

export const email = (message?: string): ValidationRule<string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern(emailRegex, message || "Invalid email address");
};

export const oneOf = <T>(values: T[], message?: string): ValidationRule<T> => {
  return (value: T) => {
    if (!values.includes(value)) {
      return message || `Value must be one of: ${values.join(", ")}`;
    }
    return true;
  };
};

export const custom = <T>(
  predicate: (value: T) => boolean,
  message: string,
): ValidationRule<T> => {
  return (value: T) => {
    return predicate(value) || message;
  };
};
