const ResultAccuracyBar = ({
  accuracy,
  label,
}: {
  accuracy: number;
  label: string;
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 sm:text-base dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-semibold text-blue-600 tabular-nums sm:text-base dark:text-blue-400">
          {accuracy.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
          style={{ width: `${accuracy}%` }}
        />
      </div>
    </div>
  );
};

export default ResultAccuracyBar;
