import {
  FaClock,
  FaListAlt,
  FaAward,
  FaStar,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { capitalizeText } from "@/utils/formatters";
import { getTestTypeConfig, getAllTags } from "@/services/examService";
import { favoriteStore } from "@/stores/favoriteStore";
import { attemptStore } from "@/stores/attemptStore";
import { Exam } from "@/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

interface TestCardProps {
  test: Exam;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const { isFavorite, toggleFavorite } = favoriteStore();
  const { getAttemptStatus } = attemptStore();

  const favorite = isFavorite(test.exam_id);
  const attemptStatus = getAttemptStatus(test.exam_id);
  const allTags = getAllTags(test);

  const testTypeConfig = getTestTypeConfig(test.type);
  const TestIcon = testTypeConfig.icon;
  const maxVisibleTags = 3;

  const visibleTags = allTags.slice(0, maxVisibleTags);
  const remainingCount = allTags.length - maxVisibleTags;

  const getButtonText = () => {
    switch (attemptStatus) {
      case "completed":
        return "Retake Test";
      case "in_progress":
        return "Continue Test";
      default:
        return "Start Test";
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(test);
  };

  return (
    <Card
      hover
      className="relative flex min-h-[280px] flex-col p-3 sm:min-h-[320px] sm:p-4"
    >
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 rounded-full p-1.5 transition-colors hover:bg-gray-100 sm:top-3 sm:right-3 sm:p-2 dark:hover:bg-gray-700"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaStar
          className={`h-4 w-4 transition-colors sm:h-5 sm:w-5 ${
            favorite
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-400 hover:text-yellow-500 dark:text-gray-500"
          }`}
        />
      </button>
      <div className="mb-2.5 flex flex-wrap gap-1.5 pr-8 sm:mb-3 sm:gap-2 sm:pr-10">
        <Badge
          variant="warning"
          icon={testTypeConfig.icon}
          className="text-xs sm:text-sm"
        >
          {capitalizeText(
            test.exam_strength || test.difficulty || "",
            "Normal",
          )}
        </Badge>
        <Badge variant="primary" icon={TestIcon} className="text-xs sm:text-sm">
          {testTypeConfig.label}
        </Badge>
        {attemptStatus && (
          <Badge
            variant={
              attemptStatus === "completed"
                ? "success"
                : attemptStatus === "in_progress"
                  ? "warning"
                  : "default"
            }
            icon={
              attemptStatus === "completed"
                ? FaCheckCircle
                : attemptStatus === "in_progress"
                  ? FaPlay
                  : undefined
            }
            className="text-xs sm:text-sm"
          >
            {capitalizeText(attemptStatus.replace("_", " "))}
          </Badge>
        )}
      </div>
      <h3 className="mb-1.5 line-clamp-1 truncate text-base leading-snug font-semibold text-gray-900 sm:mb-2 sm:text-lg dark:text-gray-100">
        {test.exam_name}
      </h3>
      {test.category && (
        <p className="mb-2.5 truncate text-xs text-gray-600 sm:mb-3 sm:text-sm dark:text-gray-400">
          {capitalizeText(test.category)}
        </p>
      )}
      <div className="mb-3 flex flex-wrap gap-2 text-xs text-gray-600 sm:mb-4 sm:gap-3 sm:text-sm dark:text-gray-400">
        <div className="flex items-center gap-1">
          <FaClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>{test.duration_minutes} mins</span>
        </div>
        <div className="flex items-center gap-1">
          <FaListAlt className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>{test.total_questions} ques</span>
        </div>
        <div className="flex items-center gap-1">
          <FaAward className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>{test.total_marks} marks</span>
        </div>
      </div>
      {allTags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
          {visibleTags.map((tag, idx) => (
            <span
              key={`${tag.type}-${idx}`}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-[0.65rem] text-gray-700 sm:px-2.5 sm:py-1 sm:text-xs dark:bg-gray-700 dark:text-gray-300"
            >
              {tag.text}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="rounded-md bg-gray-100 px-2 py-0.5 text-[0.65rem] text-gray-500 sm:px-2.5 sm:py-1 sm:text-xs dark:bg-gray-700 dark:text-gray-400"
              title={allTags
                .slice(maxVisibleTags)
                .map((t) => t.text)
                .join(", ")}
            >
              +{remainingCount}
            </span>
          )}
        </div>
      )}
      <div className="mt-auto">
        <Button
          as={Link}
          to={`/exam/${test.exam_id}`}
          variant="primary"
          className="w-full text-xs sm:py-2 sm:text-sm"
        >
          {getButtonText()}
        </Button>
      </div>
    </Card>
  );
};

export default TestCard;
