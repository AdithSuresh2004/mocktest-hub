import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFile, FaHourglassHalf, FaHistory, FaTrophy, FaChartLine, FaClock, FaArrowRight } from "react-icons/fa";
export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalExams: 0,
    pendingTests: 0,
    completedTests: 0,
    averageScore: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadDashboardData = () => {
      try {
        const attempts = JSON.parse(localStorage.getItem('attempts') || '[]');
        const pending = attempts.filter(a => a.status === 'in_progress').length;
        const completed = attempts.filter(a => a.status === 'completed');
        const avgScore = completed.length > 0
          ? (completed.reduce((sum, a) => sum + (a.score || 0), 0) / completed.length).toFixed(1)
          : 0;
        const recent = completed
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 5)
          .map(a => ({
            id: a.attempt_id,
            exam_id: a.exam_id,
            score: a.score || 0,
            timestamp: a.timestamp,
            timeTaken: a.time_taken || 0
          }));
        setStats({
          totalExams: attempts.length,
          pendingTests: pending,
          completedTests: completed.length,
          averageScore: avgScore
        });
        setRecentActivity(recent);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard:', error);
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track your exam progress and performance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaFile className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalExams}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Attempts</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <FaHourglassHalf className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingTests}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tests</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaHistory className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completedTests}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tests</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaTrophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.averageScore}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/exams')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-between group"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">Start New Exam</h3>
              <p className="text-blue-100">Browse available exams and start practicing</p>
            </div>
            <FaArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/pending')}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-between group"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">Resume Pending Test</h3>
              <p className="text-purple-100">Continue your incomplete exams</p>
            </div>
            <FaArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
            <button
              onClick={() => navigate('/attempts')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-2"
            >
              View All
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          {recentActivity.length === 0 ? (
            <div className="text-center py-12">
              <FaChartLine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No activity yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Start taking exams to see your activity here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => navigate(`/results/${activity.id}`)}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FaFile className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Exam {activity.exam_id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(activity.timestamp)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Score: {activity.score}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <FaClock className="w-3 h-3" />
                      {formatTime(activity.timeTaken)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}