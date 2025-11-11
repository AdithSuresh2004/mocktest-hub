import InstructionsPage from "@/pages/InstructionsPage";

interface ExamInstructionsDisplayProps {
  exam: any;
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
