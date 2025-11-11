import { cn } from "@/utils/cn";
import type { MetricCardProps } from "@/types/components-props";

const MetricCard = ({
  Icon,
  label,
  value,
  color = "blue",
  variant = "standard",
}: MetricCardProps) => {
  type ColorKey = "blue" | "green" | "purple" | "yellow" | "red";

  const colorClasses: Record<ColorKey, { bg: string; icon: string }> = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      icon: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/50",
      icon: "text-green-600 dark:text-green-400",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/50",
      icon: "text-purple-600 dark:text-purple-400",
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/50",
      icon: "text-yellow-600 dark:text-yellow-400",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/50",
      icon: "text-red-600 dark:text-red-400",
    },
  };

  const variantConfig = {
    standard: {
      container:
        "flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50",
      iconContainer: "h-12 w-12",
      icon: "h-6 w-6",
      value: "text-xl font-bold",
      order: "default",
    },
    compact: {
      container:
        "flex items-center gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-700/50",
      iconContainer: "h-12 w-12",
      icon: "h-6 w-6",
      value: "text-xl font-bold",
      order: "default",
    },
    prominent: {
      container:
        "flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
      iconContainer: "h-14 w-14",
      icon: "h-7 w-7",
      value: "mt-1 text-3xl font-bold",
      order: "reverse",
    },
  };

  const theme = colorClasses[color as ColorKey] || colorClasses.blue;
  const config = variantConfig[variant] || variantConfig.standard;

  const textContent = (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className={cn("text-gray-900 dark:text-gray-100", config.value)}>
        {value}
      </p>
    </div>
  );

  const iconContent = (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center rounded-lg",
        theme.bg,
        config.iconContainer,
      )}
    >
      <Icon className={cn(theme.icon, config.icon)} />
    </div>
  );

  return (
    <div className={config.container}>
      {config.order === "reverse" ? (
        <>
          {textContent}
          {iconContent}
        </>
      ) : (
        <>
          {iconContent}
          {textContent}
        </>
      )}
    </div>
  );
};

export default MetricCard;
