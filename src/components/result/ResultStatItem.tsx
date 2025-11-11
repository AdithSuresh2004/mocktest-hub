import React from "react";

interface ResultStatItemProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color: string;
  subtext?: string;
}

const ResultStatItem: React.FC<ResultStatItemProps> = ({
  icon: Icon,
  value,
  label,
  color,
  subtext = null,
}) => (
  <div className="flex items-center rounded-xl bg-white p-3 ring-1 ring-gray-200 transition-all duration-200 hover:shadow-sm dark:bg-gray-800 dark:ring-gray-700">
    <div
      className={`mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color.replace("text-", "bg-").replace("-500", "-100 dark:bg-opacity-20")} dark:bg-opacity-20`}
    >
      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
    </div>
    <div className="flex-1">
      <p className="text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
        {value}
      </p>
      <p className="text-xs font-medium text-gray-600 sm:text-sm dark:text-gray-400">
        {label}
      </p>
      {subtext && (
        <p className="text-xs text-gray-500 dark:text-gray-500">{subtext}</p>
      )}
    </div>
  </div>
);

export default ResultStatItem;
