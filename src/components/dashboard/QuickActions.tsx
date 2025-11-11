import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaPlayCircle,
  FaChartBar,
  FaBullseye,
  FaBolt,
} from "react-icons/fa";
import Section from "@/components/common/Section";

const QuickActions = () => {
  return (
    <Section
      title="Quick Actions"
      description="Jump to the most important tasks"
      icon={FaBolt}
      iconColor="text-purple-600 dark:text-purple-400"
      iconBgColor="bg-purple-100 dark:bg-purple-900/30"
      className="flex h-full flex-col"
    >
      <div className="grid flex-1 grid-cols-2 gap-4">
        <Link
          to="/exams"
          className="group flex transform items-center justify-center rounded-xl bg-blue-600 p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaBookOpen className="text-blue-100" size={20} />
            </span>
            <span className="text-sm font-semibold">Browse Exams</span>
          </div>
        </Link>

        <Link
          to="/pending"
          className="group flex transform items-center justify-center rounded-xl bg-green-600 p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaPlayCircle className="text-green-100" size={20} />
            </span>
            <span className="text-sm font-semibold">Resume Test</span>
          </div>
        </Link>

        <Link
          to="/attempts"
          className="group flex transform items-center justify-center rounded-xl bg-purple-600 p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700 hover:shadow-xl"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaChartBar className="text-purple-100" size={20} />
            </span>
            <span className="text-sm font-semibold">View Results</span>
          </div>
        </Link>

        <Link
          to="/settings"
          className="group flex transform items-center justify-center rounded-xl bg-orange-600 p-4 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-2xl">
              <FaBullseye className="text-orange-100" size={20} />
            </span>
            <span className="text-sm font-semibold">Settings</span>
          </div>
        </Link>
      </div>
    </Section>
  );
};

export default QuickActions;
