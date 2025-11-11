import { FaPlay, FaCalendar, FaClock, FaTrash } from "react-icons/fa";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import { formatDate, formatTime } from "@/utils/formatters";
import type { Attempt } from "@/types";

interface PendingTestListProps {
  tests: Attempt[];
  onDelete: (test: Attempt) => void;
  onResume: (examId: string) => void;
}

const PendingTestList = ({
  tests,
  onDelete,
  onResume,
}: PendingTestListProps) => (
  <div className="space-y-4">
    {tests.map((test) => (
      <Card key={test.id} className="p-6 transition-shadow hover:shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {test.exam_id}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaCalendar className="h-4 w-4" />
                {formatDate(test.date)}
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="h-4 w-4" />
                {formatTime(test._timeRemainingSeconds)} remaining
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 sm:mt-0">
            <Button
              onClick={() => onResume(test.exam_id)}
              variant="primary"
              icon={FaPlay}
            >
              Resume
            </Button>
            <Button
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onDelete(test);
              }}
              variant="danger"
              icon={FaTrash}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default PendingTestList;
