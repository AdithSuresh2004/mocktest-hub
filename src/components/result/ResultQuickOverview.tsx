import ResultPerformanceSummary from "@/components/result/ResultPerformanceSummary";
import ResultTestDetails from "@/components/result/ResultTestDetails";
import type { Analysis, Attempt, Exam } from "@/types";

interface ResultQuickOverviewProps {
  attempt: Attempt;
  exam: Exam;
  analysis: Analysis | null;
}

const ResultQuickOverview: React.FC<ResultQuickOverviewProps> = ({
  attempt,
  exam,
  analysis,
}) => {
  if (!analysis || !attempt || !exam) return null;

  const perf = {
    totalQuestions: analysis.overall.totalQuestions,
    correctAnswers: analysis.overall.correct,
    incorrectAnswers: analysis.overall.incorrect,
    timeSpent: attempt.time_taken || 0,
  };

  return (
    <div className="space-y-6">
      <ResultPerformanceSummary analysis={perf} />
      <ResultTestDetails attempt={attempt} exam={exam} analysis={analysis} />
    </div>
  );
};

export default ResultQuickOverview;
