import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "@/components/common/Button";

interface ReviewNavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ReviewNavigationControls: React.FC<ReviewNavigationControlsProps> = ({
  onPrev,
  onNext,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex-shrink-0 border-t border-gray-200 p-6 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <Button
          onClick={onPrev}
          disabled={isFirst}
          variant="outline"
          icon={FaArrowLeft}
          size="md"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={isLast}
          variant="primary"
          icon={FaArrowRight}
          size="md"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReviewNavigationControls;
