import React from "react";
import { THEME_CLASSES } from "@/constants/ui-config";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { cn } from "@/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "text"
  | "ghost"
  | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  as?: React.ElementType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}

type ButtonProps = BaseButtonProps & Record<string, any>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as: Component = "button",
      variant = "primary",
      size = "md",
      className = "",
      loading = false,
      disabled = false,
      icon: Icon,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeClasses: Record<ButtonSize, string> = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base",
    };

    const disabledClasses =
      loading || disabled ? "opacity-50 cursor-not-allowed" : "";

    const variantClass =
      (THEME_CLASSES.button as any)[variant] || THEME_CLASSES.button.primary;

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-md font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900",
          variantClass,

          (sizeClasses as any)[size],
          disabledClasses,
          className,
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <LoadingSpinner className="mr-2" />}
        {Icon && (
          <Icon className={cn("mr-2", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
        )}
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export default Button;
