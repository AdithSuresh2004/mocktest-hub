import { cn } from "@/utils/cn";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md";
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
  icon: Icon,
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    info: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
  };

  const sizes = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {children}
    </span>
  );
};

export default Badge;
