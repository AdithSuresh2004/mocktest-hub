import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome, FaChartBar, FaClock, FaCheckCircle, FaTimesCircle, FaTrophy, FaPercentage, FaQuestionCircle } from "react-icons/fa";
import StatusDisplay from "@/components/ui/StatusDisplay";
import useResultAnalysis, { getPerformanceLevel } from "@/hooks/useResultAnalysis"; 
import { formatTime } from "@/utils/examHelpers";
export default function ResultPage() {
    const { attemptId } = useParams();
    const navigate = useNavigate();
    const [showAnalysis, setShowAnalysis] = useState(false);
    const {
        loading,
        error,
        attempt,
        exam,
        analysis,
        totalMarks,
        actualScore,
    } = useResultAnalysis(attemptId); 
    if (loading) {
        return <StatusDisplay type="loading" message="Loading results..." />;
    }
    if (error) {
        return <StatusDisplay type="error" message={error} />;
    }
    const percentage = totalMarks > 0 ? ((actualScore / totalMarks) * 100).toFixed(1) : 0;
    const performance = getPerformanceLevel(percentage);
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
                            <FaTrophy className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Exam Completed!
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {exam.exam_name}
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Score</span>
                                <FaTrophy className="text-blue-500 dark:text-blue-400" />
                            </div>
                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                {actualScore}/{totalMarks}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">Percentage</span>
                                <FaPercentage className="text-green-500 dark:text-green-400" />
                            </div>
                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                {percentage}%
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Time Taken</span>
                                <FaClock className="text-purple-500 dark:text-purple-400" />
                            </div>
                            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                {formatTime(attempt.time_taken || 0)}
                            </p>
                        </div>
                        <div className={`bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Performance</span>
                                <FaChartBar className="text-yellow-500 dark:text-yellow-400" />
                            </div>
                            <p className={`text-xl font-bold ${performance.color}`}>
                                {performance.text}
                            </p>
                        </div>
                    </div>
                </div>
                {analysis && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Quick Overview
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <FaCheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                    {analysis.overall.correct}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Correct</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                                <FaTimesCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                                    {analysis.overall.incorrect}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Incorrect</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                                <FaQuestionCircle className="w-8 h-8 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                    {analysis.overall.unanswered}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Unanswered</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                                <FaPercentage className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    {analysis.overall.accuracy}%
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Accuracy</p>
                            </div>
                        </div>
                    </div>
                )}
                {showAnalysis && analysis && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            Section-wise Analysis
                        </h2>
                        <div className="space-y-4">
                            {analysis.sectionAnalysis.map((section, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">
                                            {section.sectionName}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {section.marksObtained}/{section.totalMarks} marks
                                            </span>
                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-medium">
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
                                            <p className="text-gray-600 dark:text-gray-400">Correct</p>
                                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                                {section.correct}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 dark:text-gray-400">Incorrect</p>
                                            <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                                {section.incorrect}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 dark:text-gray-400">Skipped</p>
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
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => setShowAnalysis(!showAnalysis)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
                    >
                        <FaChartBar className="w-5 h-5" />
                        {showAnalysis ? "Hide Analysis" : "View Detailed Analysis"}
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl shadow-md transition-all duration-200"
                    >
                        <FaHome className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}