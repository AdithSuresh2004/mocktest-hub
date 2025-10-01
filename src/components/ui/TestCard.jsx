import { useState, useEffect } from "react";
import {
  FaClock,
  FaListAlt,
  FaBullseye,
  FaAward,
  FaBook,
  FaFileAlt,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const getDifficultyColor = (strength) =>
({
  Easy: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  Medium:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  Hard: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
}[strength] ||
  "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400");
const getTestTypeConfig = (type) =>
({
  full_tests: {
    color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    icon: FaFileAlt, 
    label: "Mock Test",
  },
  subject_tests: {
    color:
      "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    icon: FaBook, 
    label: "Subject Test",
  },
  topic_tests: {
    color:
      "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
    icon: FaBullseye, 
    label: "Topic Test",
  },
}[type] || {
  color: "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
  icon: FaFileAlt, 
  label: "Test",
});
export default function TestCard({ test }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const testTypeConfig = getTestTypeConfig(test.type);
  const TestIcon = testTypeConfig.icon;
  const subjects = test.subjects || (test.subject ? [test.subject] : []);
  const topics = test.topics || (test.topic ? [test.topic] : []);
  const allTags = [
    ...subjects.map((s) => ({ text: s, type: "subject" })),
    ...topics.map((t) => ({ text: t, type: "topic" })),
  ];
  const maxVisibleTags = 3;
  const visibleTags = allTags.slice(0, maxVisibleTags);
  const remainingCount = allTags.length - maxVisibleTags;
  useEffect(() => {
    checkFavoriteStatus();
  }, [test.exam_id]);
  const checkFavoriteStatus = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const exists = favorites.some(f => f.exam_id === test.exam_id);
      setIsFavorite(exists);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (isFavorite) {
        const filtered = favorites.filter(f => f.exam_id !== test.exam_id);
        localStorage.setItem('favorites', JSON.stringify(filtered));
        setIsFavorite(false);
      } else {
        const favoriteData = {
          exam_id: test.exam_id,
          exam_name: test.exam_name,
          type: testTypeConfig.label,
          subject: subjects[0] || test.category || '',
          duration_minutes: test.duration_minutes,
          total_questions: test.total_questions,
          total_marks: test.total_marks,
          exam_strength: test.exam_strength,
          addedAt: new Date().toISOString()
        };
        favorites.push(favoriteData);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200 p-4 flex flex-col h-72 relative">
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaStar 
          className={`w-5 h-5 transition-colors ${isFavorite
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-400 dark:text-gray-500 hover:text-yellow-500"
            }`}
        />
      </button>
      <div className="flex flex-wrap gap-2 mb-3 pr-10">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
            test.exam_strength
          )}`}
        >
          {test.exam_strength || "Normal"}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${testTypeConfig.color}`}
        >
          <TestIcon className="w-3 h-3 mr-1.5" />
          {testTypeConfig.label}
        </span>
      </div>
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100 text-lg leading-snug line-clamp-2">
        {test.exam_name}
      </h3>
      {test.category && (
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 truncate">
          {test.category}
        </p>
      )}
      <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <FaClock className="w-4 h-4" /> 
          <span>{test.duration_minutes} mins</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaListAlt className="w-4 h-4" /> 
          <span>{test.total_questions} ques</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaAward className="w-4 h-4" /> 
          <span>{test.total_marks} marks</span>
        </div>
      </div>
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {visibleTags.map((tag, idx) => (
            <span
              key={`${tag.type}-${idx}`}
              className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
            >
              {tag.text}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md"
              title={allTags.slice(maxVisibleTags).map((t) => t.text).join(", ")}
            >
              +{remainingCount} more
            </span>
          )}
        </div>
      )}
      <div className="mt-auto">
        <Link
          to={`/exam/${test.exam_id}`}
          className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg py-2.5 px-4 transition-colors duration-200"
        >
          Start Test
        </Link>
      </div>
    </div>
  );
}