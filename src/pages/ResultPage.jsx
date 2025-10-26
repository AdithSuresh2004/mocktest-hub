import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FaChartBar,
  FaCheckCircle,
  FaTrophy,
  FaQuestionCircle,
  FaClock,
  FaTimesCircle,
  FaHome,
  FaPercentage,
} from 'react-icons/fa'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import StatCard from '@/components/common/StatCard'
import useResultAnalysis, {
  getPerformanceLevel,
} from '@/hooks/result/useResultAnalysis'
import { formatTime } from '@/utils/formatters/formatters'

const ResultPage = () => {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [showAnalysis, setShowAnalysis] = useState(false)
  const { loading, error, attempt, exam, analysis, totalMarks, actualScore } =
    useResultAnalysis(attemptId)
  if (loading) {
    return <LoadingSpinner fullScreen message="Loading results..." />
  }
  if (error) {
    return <StatusDisplay type="error" message={error} />
  }
  const percentage =
    totalMarks > 0 ? ((actualScore / totalMarks) * 100).toFixed(1) : 0
  const performance = getPerformanceLevel(percentage)
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
          <div className="text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
              <FaTrophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Exam Completed!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {exam.exam_name}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:border-blue-700 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Score
                </span>
                <FaTrophy className="text-blue-500 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {actualScore}/{totalMarks}
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-4 dark:border-green-700 dark:from-green-900/20 dark:to-green-800/20">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Percentage
                </span>
                <FaPercentage className="text-green-500 dark:text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {percentage}%
              </p>
            </div>
            <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 dark:border-purple-700 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Time Taken
                </span>
                <FaClock className="text-purple-500 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {formatTime(attempt.time_taken || 0)}
              </p>
            </div>
            <div
              className={`rounded-xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 dark:border-yellow-700 dark:from-yellow-900/20 dark:to-yellow-800/20`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  Performance
                </span>
                <FaChartBar className="text-yellow-500 dark:text-yellow-400" />
              </div>
              <p className={`text-xl font-bold ${performance.color}`}>
                {performance.text}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:p-8 dark:bg-gray-800">
          <div className="mb-4 text-center sm:mb-0 sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Review Your Answers
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Check your responses and see detailed explanations.
            </p>
          </div>
          <button
            onClick={() => navigate(`/review/${attemptId}`)}
            className="transform rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Review Answers
          </button>
        </div>
        {analysis && (
          <div className="mt-6 mb-6 rounded-2xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
              Quick Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center dark:border-green-700 dark:bg-green-900/20">
                <FaCheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {analysis.overall.correct}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Correct
                </p>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-700 dark:bg-red-900/20">
                <FaTimesCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
                <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                  {analysis.overall.incorrect}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Incorrect
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-600 dark:bg-gray-700/50">
                <FaQuestionCircle className="mx-auto mb-2 h-8 w-8 text-gray-500 dark:text-gray-400" />
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  {analysis.overall.unanswered}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Unanswered
                </p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-700 dark:bg-blue-900/20">
                <FaPercentage className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {analysis.overall.accuracy}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Accuracy
                </p>
              </div>
            </div>
          </div>
        )}
        {showAnalysis && analysis && (
          <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
              Section-wise Analysis
            </h2>
            <div className="space-y-4">
              {analysis.sectionAnalysis.map((section, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700"
                >
                  <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:mb-0 dark:text-gray-100">
                      {section.sectionName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {section.marksObtained}/{section.totalMarks} marks
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {section.accuracy}% accuracy
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-center text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {section.totalQuestions}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Correct
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {section.correct}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Incorrect
                      </p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {section.incorrect}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Skipped
                      </p>
                      <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                        {section.unanswered}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700"
          >
            <FaChartBar className="h-5 w-5" />
            {showAnalysis ? 'Hide Analysis' : 'View Detailed Analysis'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-200 px-6 py-4 font-semibold text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <FaHome className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
