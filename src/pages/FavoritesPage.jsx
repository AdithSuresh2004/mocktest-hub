import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaTrash,
  FaPlay,
  FaClock,
  FaListAlt,
  FaAward,
} from "react-icons/fa";
export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadFavorites();
    const handleStorageChange = () => {
      loadFavorites();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const loadFavorites = () => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const sorted = savedFavorites.sort((a, b) =>
        new Date(b.addedAt || 0) - new Date(a.addedAt || 0)
      );
      setFavorites(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setLoading(false);
    }
  };
  const handleRemove = (examId, e) => {
    e.stopPropagation();
    if (confirm('Remove this exam from favorites?')) {
      try {
        const filtered = favorites.filter(f => f.exam_id !== examId);
        localStorage.setItem('favorites', JSON.stringify(filtered));
        setFavorites(filtered);
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    }
  };
  const handleStart = (examId) => {
    navigate(`/exam/${examId}`);
  };
  const getDifficultyColor = (strength) => {
    const colors = {
      Easy: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      Medium: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
      Hard: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    };
    return colors[strength] || "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Saved Tests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your favorite exams for quick access ({favorites.length} {favorites.length === 1 ? 'test' : 'tests'})
          </p>
        </div>
        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaStar className="w-16 h-16 text-gray-400 mx-auto mb-4" /> 
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Saved Tests</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save your favorite exams to access them quickly. Click the star icon on any test card to add it here.
            </p>
            <button
              onClick={() => navigate('/exams')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse Exams
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.exam_id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleStart(favorite.exam_id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaStar className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {favorite.type || 'Exam'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleRemove(favorite.exam_id, e)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash className="w-4 h-4" /> 
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {favorite.exam_name || `Exam ${favorite.exam_id}`}
                </h3>
                {favorite.subject && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 truncate">
                    {favorite.subject}
                  </p>
                )}
                {favorite.exam_strength && (
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(favorite.exam_strength)}`}>
                      {favorite.exam_strength}
                    </span>
                  </div>
                )}
                <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                  {favorite.duration_minutes && (
                    <div className="flex items-center gap-1.5">
                      <FaClock className="w-4 h-4" /> 
                      <span>{favorite.duration_minutes} mins</span>
                    </div>
                  )}
                  {favorite.total_questions && (
                    <div className="flex items-center gap-1.5">
                      <FaListAlt className="w-4 h-4" /> 
                      <span>{favorite.total_questions} ques</span>
                    </div>
                  )}
                  {favorite.total_marks && (
                    <div className="flex items-center gap-1.5">
                      <FaAward className="w-4 h-4" /> 
                      <span>{favorite.total_marks} marks</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleStart(favorite.exam_id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FaPlay className="w-4 h-4" /> 
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}