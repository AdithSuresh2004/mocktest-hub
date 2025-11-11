import {
  FaPlay,
  FaListAlt,
  FaClock,
  FaStar,
  FaTrash,
  FaAward,
} from "react-icons/fa";
import Card from "@/components/common/Card";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { capitalizeText } from "@/utils/formatters";
import type { Exam } from "@/types";

interface FavoriteCardProps {
  favorite: Exam;
  onStart: (examId: string) => void;
  onRemove: (examId: string, examName: string, e: React.MouseEvent) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  favorite,
  onStart,
  onRemove,
}) => {
  return (
    <Card
      className="cursor-pointer p-6 transition-shadow hover:shadow-md"
      onClick={() => onStart(favorite.exam_id)}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FaStar className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <Badge variant="default">{favorite.type || "Exam"}</Badge>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(favorite.exam_id, favorite.exam_name, e);
          }}
          className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700"
          aria-label="Remove from favorites"
        >
          <FaTrash className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {favorite.exam_name || `Exam ${favorite.exam_id}`}
      </h3>

      {favorite.subject && (
        <p className="mb-3 truncate text-sm text-gray-600 dark:text-gray-400">
          {favorite.subject}
        </p>
      )}

      {favorite.exam_strength && (
        <div className="mb-3">
          <Badge variant="warning">
            {capitalizeText(favorite.exam_strength, "Medium")}
          </Badge>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
        {favorite.duration_minutes && (
          <div className="flex items-center gap-1.5">
            <FaClock className="h-4 w-4" />
            <span>{favorite.duration_minutes} mins</span>
          </div>
        )}
        {favorite.total_questions && (
          <div className="flex items-center gap-1.5">
            <FaListAlt className="h-4 w-4" />
            <span>{favorite.total_questions} ques</span>
          </div>
        )}
        {favorite.total_marks && (
          <div className="flex items-center gap-1.5">
            <FaAward className="h-4 w-4" />
            <span>{favorite.total_marks} marks</span>
          </div>
        )}
      </div>

      <Button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onStart(favorite.exam_id);
        }}
        variant="primary"
        className="w-full"
        icon={FaPlay}
      >
        Start Exam
      </Button>
    </Card>
  );
};

export default FavoriteCard;
