import { FaBookOpen } from "react-icons/fa";
import ResultCard from "@/components/result/ResultCard";

interface StatItemProps {
  label: string;
  value: number;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  color = "text-gray-600 dark:text-gray-300",
}) => (
  <div className="flex flex-col items-center space-y-1">
    <p className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
      {label}
    </p>
    <p className={`text-lg font-bold ${color} sm:text-xl`}>{value}</p>
  </div>
);

interface Section {
  sectionName: string;
  accuracy: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  totalQuestions: number;
}

interface SectionRowProps {
  section: Section;
}

const SectionRow: React.FC<SectionRowProps> = ({ section }) => {
  const accuracyColor =
    section.accuracy >= 75
      ? "bg-gradient-to-r from-green-500 to-green-400"
      : section.accuracy >= 50
        ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
        : "bg-gradient-to-r from-red-500 to-red-400";

  const accuracyTextColor =
    section.accuracy >= 75
      ? "text-green-700 dark:text-green-300"
      : section.accuracy >= 50
        ? "text-yellow-700 dark:text-yellow-300"
        : "text-red-700 dark:text-red-300";

  return (
    <div className="overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:ring-gray-700">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-gray-100">
            {section.sectionName}
          </h3>
          <span className={`text-sm font-bold ${accuracyTextColor}`}>
            {section.accuracy}%
          </span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${accuracyColor}`}
            style={{ width: `${section.accuracy}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatItem
          label="Correct"
          value={section.correct}
          color="text-green-600 dark:text-green-400"
        />
        <StatItem
          label="Incorrect"
          value={section.incorrect}
          color="text-red-600 dark:text-red-400"
        />
        <StatItem
          label="Unanswered"
          value={section.unanswered}
          color="text-orange-600 dark:text-orange-400"
        />
        <StatItem
          label="Total"
          value={section.totalQuestions}
          color="text-blue-600 dark:text-blue-400"
        />
      </div>
    </div>
  );
};

interface ResultSectionAnalysisProps {
  analysis: {
    sectionAnalysis: Section[];
  };
  showAnalysis: boolean;
}

const ResultSectionAnalysis: React.FC<ResultSectionAnalysisProps> = ({
  analysis,
  showAnalysis,
}) => {
  if (!showAnalysis || !analysis) return null;

  return (
    <ResultCard
      title="Section-wise Analysis"
      icon={FaBookOpen}
      iconBgColor="bg-blue-100 dark:bg-blue-900/50"
      iconColor="text-blue-600 dark:text-blue-400"
    >
      <div className="space-y-4">
        {analysis.sectionAnalysis.map((section) => (
          <SectionRow key={section.sectionName} section={section} />
        ))}
      </div>
    </ResultCard>
  );
};

export default ResultSectionAnalysis;
