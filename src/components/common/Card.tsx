import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "transparent";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

const paddingMap = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "default",
      padding = "md",
      hover = false,
      onClick,
    },
    ref,
  ) => {
    const variants = {
      default:
        "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800",
      gradient:
        "rounded-xl border border-gray-200 bg-gradient-to-br shadow-sm dark:border-gray-700",
      transparent: "rounded-xl border border-gray-200 dark:border-gray-700",
    };

    const hoverClass = hover
      ? "transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          paddingMap[padding],
          hoverClass,
          "h-full",
          className,
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
