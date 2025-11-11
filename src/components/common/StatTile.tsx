import Card from "@/components/common/Card";

interface StatTileProps {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  iconBgColor?: string;
  iconColor?: string;
  valueColor?: string;
  className?: string;
  valueClassName?: string;
}

const StatTile: React.FC<StatTileProps> = ({
  icon: Icon,
  label,
  value,
  iconBgColor = "bg-blue-100 dark:bg-blue-900/20",
  iconColor = "text-blue-600 dark:text-blue-400",
  valueColor = "text-gray-900 dark:text-gray-100",
  className = "",
  valueClassName = "",
}) => {
  return (
    <Card variant="default" padding="none" hover className={className}>
      <div className="px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {Icon && (
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${iconBgColor}`}
            >
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {label}
            </p>
            <p
              className={`mt-0.5 text-xl font-bold sm:mt-1 sm:text-2xl ${
                valueColor || "text-gray-900 dark:text-gray-100"
              } ${valueClassName}`}
            >
              {value}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatTile;
