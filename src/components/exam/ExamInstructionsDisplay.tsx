import InstructionsPage from "@/pages/InstructionsPage";
import type { Exam } from "@/types";

interface ExamInstructionsDisplayProps {
  exam: Exam;
  onStart: () => void;
  isStarting?: boolean;
}

const ExamInstructionsDisplay = ({
  exam,
  onStart,
  isStarting = false,
}: ExamInstructionsDisplayProps) => {
  return (
    <InstructionsPage exam={exam} onStart={onStart} isStarting={isStarting} />
  );
};

export default ExamInstructionsDisplay;
