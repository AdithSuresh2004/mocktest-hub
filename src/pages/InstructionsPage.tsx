import Button from "@/components/common/Button";
import InstructionContent from "@/components/exam/InstructionContent";
import { Exam } from "@/types";
import { useEffect } from "react";
import { globalLoadingStore } from "@/stores/globalLoadingStore";

interface InstructionsPageProps {
  exam: Exam;
  onStart: () => void;
  isStarting?: boolean;
}

const InstructionsPage = ({
  exam,
  onStart,
  isStarting = false,
}: InstructionsPageProps) => {
  const { show, hide } = globalLoadingStore();

  useEffect(() => {
    if (isStarting) {
      show("Starting exam...");
    } else {
      hide();
    }

    return () => {
      if (isStarting) {
        hide();
      }
    };
  }, [isStarting, show, hide]);

  if (!exam) return null;

  if (isStarting) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-colors duration-200 dark:bg-gray-900">
      <div className="w-full max-w-6xl rounded-lg bg-white p-8 shadow-lg transition-colors duration-200 dark:bg-gray-800">
        <InstructionContent exam={exam} />
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => window.history.back()}
            variant="secondary"
            size="lg"
            disabled={isStarting}
          >
            Cancel
          </Button>
          <Button
            onClick={onStart}
            variant="primary"
            size="lg"
            disabled={isStarting}
          >
            {isStarting ? "Starting..." : "Start Exam"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
