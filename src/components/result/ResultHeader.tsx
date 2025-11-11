import { FaTrophy, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ResultHeaderProps {
  examName: string;
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ examName }) => {
  return (
    <div className="relative overflow-hidden rounded-b-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-4 pb-8 text-center shadow-xl sm:mb-8 sm:rounded-b-3xl sm:p-6 sm:pb-12 lg:pb-16 dark:from-blue-700 dark:via-purple-600 dark:to-indigo-800">
      <div className="absolute inset-0 bg-black/10" />
      <Link
        to="/"
        className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-full bg-white/20 p-2 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none sm:top-4 sm:left-4 sm:gap-2 sm:p-2.5 sm:text-sm"
      >
        <FaHome className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <div className="relative z-10">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/25 shadow-inner ring-4 ring-white/20 backdrop-blur-sm sm:mb-4 sm:h-18 sm:w-18 sm:ring-8">
          <FaTrophy className="h-6 w-6 text-white drop-shadow-lg sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
        </div>
        <h1 className="mb-1 text-xl font-bold text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
          Test Result
        </h1>
        <p className="text-sm font-medium text-blue-100 drop-shadow-sm sm:text-base lg:text-lg">
          {examName}
        </p>
      </div>
    </div>
  );
};

export default ResultHeader;
