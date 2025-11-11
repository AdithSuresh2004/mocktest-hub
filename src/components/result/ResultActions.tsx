import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaChartBar, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/common/Button";

interface ResultActionsProps {
  attemptId: string;
  onShowAnalysis: () => void;
  showAnalysis: boolean;
}

const ResultActions = ({
  attemptId,
  onShowAnalysis,
  showAnalysis,
}: ResultActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200 transition-all duration-200 hover:shadow-xl dark:bg-gray-800 dark:ring-gray-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
        <Button
          onClick={() => navigate(`/review/${attemptId}`)}
          variant="primary"
          icon={FaClipboardList}
          size="lg"
          className="flex-1 rounded-xl px-6 py-4 font-semibold shadow-sm transition-transform active:scale-95"
        >
          Review Answers
        </Button>
        <Button
          onClick={onShowAnalysis}
          variant="secondary"
          icon={showAnalysis ? FaEyeSlash : FaChartBar}
          size="lg"
          className="flex-1 rounded-xl px-6 py-4 font-semibold shadow-sm transition-transform active:scale-95"
        >
          {showAnalysis ? "Hide Analysis" : "Show Analysis"}
        </Button>
      </div>
    </div>
  );
};

export default ResultActions;
