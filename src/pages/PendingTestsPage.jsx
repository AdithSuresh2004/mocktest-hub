import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHourglassHalf, FaClock, FaPlay, FaTrash, FaCalendar } from "react-icons/fa";
export default function PendingTestsPage() {
  const navigate = useNavigate();
  const [pendingTests, setPendingTests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadPendingTests();
  }, []);
  const loadPendingTests = () => {
    try {
      const attempts = JSON.parse(localStorage.getItem('attempts') || '[]');
      const pending = attempts.filter(a => a.status === 'in_progress')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setPendingTests(pending);
      setLoading(false);
    } catch (error) {
      console.error('Error loading pending tests:', error);
      setLoading(false);
    }
  };
  const handleDelete = (attemptId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this pending test?')) {
      try {
        const attempts = JSON.parse(localStorage.getItem('attempts') || '[]');
        const filtered = attempts.filter(a => a.attempt_id !== attemptId);
        localStorage.setItem('attempts', JSON.stringify(filtered));
        loadPendingTests();
      } catch (error) {
        console.error('Error deleting attempt:', error);
      }
    }
  };
  const handleResume = (examId) => {
    navigate(`/exam/${examId}`);
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} minutes remaining`;
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pending Tests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Resume your incomplete exams</p>
        </div>
        {pendingTests.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {pendingTests.map((test) => (
              <div
                key={test.attempt_id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Exam {test.exam_id}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="w-4 h-4" />
                        {formatDate(test.timestamp)}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="w-4 h-4" />
                        {formatTime(test._timeRemainingSeconds || 0)}
                      </div>
                    </div>
                    {test.responses && test.responses.length > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {test.responses.length} questions answered
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResume(test.exam_id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <FaPlay className="w-4 h-4" />
                      Resume
                    </button>
                    <button
                      onClick={(e) => handleDelete(test.attempt_id, e)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium rounded-lg transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
