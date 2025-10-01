import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaTrophy, FaClock, FaCalendar, FaEye, FaSort, FaFilter, FaChartLine } from "react-icons/fa";
import { storage } from "@/services/storageService";
import { formatDate, formatTime, getPerformanceColor } from "@/utils/formatters";
export default function AttemptsPage() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterScore, setFilterScore] = useState('all');
  const [showStats, setShowStats] = useState(false);
  useEffect(() => {
    loadAttempts();
    const unsubscribe = storage.subscribe('attempts', loadAttempts);
    return unsubscribe;
  }, []);
  const loadAttempts = () => {
    const completed = storage.getAttempts()
      .filter(a => a.status === 'completed');
    setAttempts(completed);
    setLoading(false);
  };
  const sortedAndFiltered = useMemo(() => {
    let filtered = [...attempts];
    if (filterScore !== 'all') {
      filtered = filtered.filter(a => {
        const percentage = (a.score / 100) * 100;
        if (filterScore === 'high') return percentage >= 80;
        if (filterScore === 'medium') return percentage >= 60 && percentage < 80;
        if (filterScore === 'low') return percentage < 60;
        return true;
      });
    }
    filtered.sort((a, b) => {
      let compareValue = 0;
      switch(sortBy) {
        case 'date':
          compareValue = new Date(b.timestamp) - new Date(a.timestamp);
          break;
        case 'score':
          compareValue = (b.score || 0) - (a.score || 0);
          break;
        case 'time':
          compareValue = (a.time_taken || 0) - (b.time_taken || 0);
          break;
        default:
          compareValue = 0;
      }
      return sortOrder === 'asc' ? -compareValue : compareValue;
    });
    return filtered;
  }, [attempts, sortBy, sortOrder, filterScore]);
  const stats = useMemo(() => {
    if (attempts.length === 0) return null;
    const scores = attempts.map(a => a.score || 0);
    const times = attempts.map(a => a.time_taken || 0);
    return {
      total: attempts.length,
      avgScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
      bestScore: Math.max(...scores),
      worstScore: Math.min(...scores),
      avgTime: Math.floor(times.reduce((a, b) => a + b, 0) / times.length),
      totalTime: times.reduce((a, b) => a + b, 0)
    };
  }, [attempts]);
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Test Results</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">View your completed exam results</p>
          </div>
          {attempts.length > 0 && (
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaChartLine className="w-4 h-4" />
              {showStats ? 'Hide' : 'Show'} Stats
            </button>
          )}
        </div>
        {showStats && stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.avgScore}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Score</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.bestScore}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Worst Score</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.worstScore}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{formatTime(stats.avgTime)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Time</p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{formatTime(stats.totalTime)}</p>
            </div>
          </div>
        )}
        {attempts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FaHistory className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Results Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Complete an exam to see your results here</p>
            <button
              onClick={() => navigate('/exams')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Take an Exam
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <FaSort className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                  <button
                    onClick={() => toggleSort('date')}
                    className={`px-3 py-1 rounded text-sm ${sortBy === 'date' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => toggleSort('score')}
                    className={`px-3 py-1 rounded text-sm ${sortBy === 'score' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    Score {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => toggleSort('time')}
                    className={`px-3 py-1 rounded text-sm ${sortBy === 'time' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    Time {sortBy === 'time' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <FaFilter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
                  <select
                    value={filterScore}
                    onChange={(e) => setFilterScore(e.target.value)}
                    className="px-3 py-1 rounded text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0"
                  >
                    <option value="all">All Scores</option>
                    <option value="high">High (80%+)</option>
                    <option value="medium">Medium (60-79%)</option>
                    <option value="low">Low (&lt;60%)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {sortedAndFiltered.map((attempt) => (
                <div
                  key={attempt.attempt_id}
                  onClick={() => navigate(`/results/${attempt.attempt_id}`)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Exam {attempt.exam_id}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FaCalendar className="w-4 h-4" />
                          {formatDate(attempt.timestamp, 'short')}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FaClock className="w-4 h-4" />
                          {formatTime(attempt.time_taken || 0)}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaTrophy className={`w-4 h-4 ${getPerformanceColor(attempt.score || 0, 100)}`} />
                          <span className={`font-semibold ${getPerformanceColor(attempt.score || 0, 100)}`}>
                            Score: {attempt.score || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors self-start lg:self-center">
                      <FaEye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}