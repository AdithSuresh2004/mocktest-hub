import { useNavigate } from "react-router-dom";
import { FaHourglassHalf } from "react-icons/fa";

export default function NoPendingTests() {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
      <FaHourglassHalf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Pending Tests</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any incomplete exams at the moment</p>
      <button
        onClick={() => navigate('/exams')}
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Browse Exams
      </button>
    </div>
  );
}
