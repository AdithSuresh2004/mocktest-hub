import type { IconType } from "react-icons";

interface ResultCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  icon?: IconType;
  iconBgColor?: string;
  iconColor?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  children,
  className = "",
  title,
  icon: Icon,
  iconBgColor = "bg-gray-100 dark:bg-gray-700",
  iconColor = "text-gray-600 dark:text-gray-300",
}) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg ring-1 ring-gray-100 transition-all duration-200 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:ring-gray-800 ${className}`}
    >
      {title && (
        <div className="flex items-center border-b border-gray-200 p-4 sm:p-5 dark:border-gray-700">
          {Icon && (
            <div
              className={`mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl shadow-sm sm:mr-4 sm:h-10 sm:w-10 ${iconBgColor}`}
            >
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
            </div>
          )}
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default ResultCard;
