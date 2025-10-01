import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaExclamationCircle,
  FaFileAlt,
  FaRedo,
  FaFilter,
  FaTimes,
  FaSearch,
  FaHome,
  FaBook,
  FaBullseye,
} from "react-icons/fa";
import TestCard from "@/components/ui/TestCard";
import { useExamSelection } from "@/hooks/useExamSelection";
const TEST_TYPE_ICONS = {
  all: FaHome,
  full_tests: FaFileAlt,
  subject_tests: FaBook,
  topic_tests: FaBullseye,
};
const FilterSelect = ({ label, value, options, onChange }) => (
  <select
    className="px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 transition-colors"
    value={value}
    onChange={(e) => onChange(label, e.target.value)}
  >
    {options.map((option) => (
      <option key={option.value || option} value={option.value || option}>
        {option.label || option}
      </option>
    ))}
  </select>
);
export default function ExamSelectionPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const {
    loading, error, allTests, activeTab, searchTerm, selectedExam,
    selectedTopic, selectedSubject, selectedStrength, tabCounts,
    examNames, topics, subjects, STRENGTHS, filteredTests,
    hasActiveFilters, loadManifest, setActiveTab, setSearchTerm,
    handleFilterChange, clearAllFilters,
  } = useExamSelection();
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  const handleClearFilters = () => {
    clearAllFilters();
    setShowMobileFilters(false);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading exams...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <FaExclamationCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={loadManifest}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaRedo className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (!allTests.length) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <FaFileAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Exams Available</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're working hard to add more exams. Please check back later!
          </p>
          <button
            onClick={loadManifest}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaRedo className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 w-full">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between md:justify-start">
              {tabCounts.map((type) => {
                const Icon = TEST_TYPE_ICONS[type.id];
                const isActive = activeTab === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-200 border-b-2 text-center min-w-0 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
            <button
              onClick={toggleMobileFilters}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="flex items-center text-gray-900 dark:text-gray-100 font-medium">
                <FaFilter className="w-5 h-5 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                    Active
                  </span>
                )}
              </span>
              <FaTimes
                className={`w-5 h-5 transition-transform duration-200 ${
                  !showMobileFilters ? "rotate-45" : ""
                }`}
              />
            </button>
          </div>
          <div className={`${showMobileFilters ? "block" : "hidden"} lg:block p-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="relative sm:col-span-2 lg:col-span-2">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <FilterSelect
                label="examName"
                value={selectedExam}
                options={examNames}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="subject"
                value={selectedSubject}
                options={subjects}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="topic"
                value={selectedTopic}
                options={topics}
                onChange={handleFilterChange}
              />
              <FilterSelect
                label="strength"
                value={selectedStrength}
                options={STRENGTHS}
                onChange={handleFilterChange}
              />
            </div>
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  <FaTimes className="w-4 h-4 mr-2" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredTests.length === 0 ? (
              "No tests found"
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {filteredTests.length}
                </span>
                {filteredTests.length !== allTests.length && (
                  <>
                    {" "}
                    of <span className="font-semibold">{allTests.length}</span>
                  </>
                )}{" "}
                tests
              </>
            )}
          </p>
        </div>
        {filteredTests.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <FaSearch className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No tests match your criteria
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find the perfect
              practice test for you.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaRedo className="w-4 h-4 mr-2" />
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <TestCard
                key={test.uid || test.exam_id || `${test.type}-${test.exam_name}`}
                test={test}
                selectedTopic={selectedTopic !== "All Topics" ? selectedTopic : undefined}
                selectedSubject={selectedSubject !== "All Subjects" ? selectedSubject : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
