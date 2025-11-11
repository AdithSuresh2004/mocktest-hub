import ResultCard from "@/components/result/ResultCard";
import ResultStatItem from "@/components/result/ResultStatItem";
import ResultAccuracyBar from "@/components/result/ResultAccuracyBar";
import {
  FaBullseye,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
} from "react-icons/fa";

interface ResultPerformanceSummaryProps {
  analysis: {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    timeSpent: number;
  };
}

const ResultPerformanceSummary = ({
  analysis,
}: ResultPerformanceSummaryProps) => {
  const unanswered =
    analysis.totalQuestions -
    analysis.correctAnswers -
    analysis.incorrectAnswers;
  const accuracy =
    analysis.totalQuestions > 0
      ? (analysis.correctAnswers / analysis.totalQuestions) * 100
      : 0;

  return (
    <ResultCard
      title="Performance Summary"
      icon={FaBullseye}
      iconBgColor="bg-green-100 dark:bg-green-900/50"
      iconColor="text-green-600 dark:text-green-400"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultStatItem
            icon={FaCheckCircle}
            value={analysis.correctAnswers}
            label="Correct Answers"
            color="text-green-500"
            subtext={`${((analysis.correctAnswers / analysis.totalQuestions) * 100).toFixed(0)}% of total`}
          />
          <ResultStatItem
            icon={FaTimesCircle}
            value={analysis.incorrectAnswers}
            label="Incorrect Answers"
            color="text-red-500"
            subtext={`${((analysis.incorrectAnswers / analysis.totalQuestions) * 100).toFixed(0)}% of total`}
          />
          <ResultStatItem
            icon={FaQuestionCircle}
            value={unanswered}
            label="Unanswered"
            color="text-orange-500"
            subtext={`${((unanswered / analysis.totalQuestions) * 100).toFixed(0)}% of total`}
          />
        </div>
        <ResultAccuracyBar accuracy={accuracy} label="Overall Accuracy" />
      </div>
    </ResultCard>
  );
};

export default ResultPerformanceSummary;
