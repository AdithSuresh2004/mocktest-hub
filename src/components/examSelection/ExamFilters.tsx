import { FaFilter, FaTimes, FaSearch } from "react-icons/fa";
import FilterSelect from "@/components/common/FilterSelect";
import Card from "@/components/common/Card";
import { examSelectionStore } from "@/stores/examSelectionStore";

interface ExamFiltersProps {
  handleFilterChange: (filterName: string, value: string | number) => void;
}

const ExamFilters = ({ handleFilterChange }: ExamFiltersProps) => {
  const {
    showMobileFilters,
    hasActiveFilters,
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
    examNames,
    topics,
    subjects,
    STRENGTHS,
    ATTEMPT_STATUSES,
    toggleMobileFilters,
    setSearchTerm,
    clearAllFilters,
  } = examSelectionStore();

  return (
    <Card variant="default" className="mb-6">
      <div className="border-b border-gray-200 p-4 lg:hidden dark:border-gray-700">
        <button
          onClick={toggleMobileFilters}
          className="flex w-full items-center justify-between text-left text-gray-900 dark:text-gray-100"
        >
          <span className="flex items-center font-medium">
            <FaFilter className="mr-2 h-5 w-5" />
            Filters
            {hasActiveFilters() && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Active
              </span>
            )}
          </span>
          <FaTimes
            className={`h-5 w-5 transition-transform duration-200 ${
              !showMobileFilters ? "rotate-45" : ""
            }`}
          />
        </button>
      </div>
      <div className={`${showMobileFilters ? "block" : "hidden"} p-4 lg:block`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-full">
            <div className="relative mt-5">
              <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <FilterSelect
            label="Exam"
            value={selectedExam}
            options={examNames}
            onChange={(newValue) => handleFilterChange("Exam", newValue)}
          />
          <FilterSelect
            label="Subject"
            value={selectedSubject}
            options={subjects}
            onChange={(newValue) => handleFilterChange("Subject", newValue)}
          />
          <FilterSelect
            label="Topic"
            value={selectedTopic}
            options={topics}
            onChange={(newValue) => handleFilterChange("Topic", newValue)}
          />
          <FilterSelect
            label="Strength"
            value={selectedStrength}
            options={STRENGTHS}
            onChange={(newValue) => handleFilterChange("Strength", newValue)}
          />
          <FilterSelect
            label="Attempt Status"
            value={selectedAttemptStatus}
            options={ATTEMPT_STATUSES}
            onChange={(newValue) =>
              handleFilterChange("Attempt Status", newValue)
            }
          />
        </div>
        {hasActiveFilters() && (
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <FaTimes className="mr-2 h-4 w-4" />
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExamFilters;
