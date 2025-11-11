import { FaSortUp, FaSortDown, FaUndoAlt, FaTimes } from "react-icons/fa";
import FilterSelect from "@/components/common/FilterSelect";
import Card from "@/components/common/Card";

interface Filters {
  category: string;
  subject: string;
  topic: string;
}

interface FilterOptions {
  categories: string[];
  subjects: string[];
  topics: string[];
}

interface AttemptFilterProps {
  filters: Filters;
  filterOptions: FilterOptions;
  handleFilterChange: (filterName: keyof Filters, value: string) => void;
  sortOrder: "asc" | "desc";
  toggleSort: () => void;
  onResetFilters: () => void;
}

const AttemptFilter: React.FC<AttemptFilterProps> = ({
  filters,
  filterOptions,
  handleFilterChange,
  sortOrder,
  toggleSort,
  onResetFilters,
}) => {
  const activeFilters = [
    filters.category !== "all" && {
      label: "Category",
      value: filters.category,
    },
    filters.subject !== "all" && { label: "Subject", value: filters.subject },
    filters.topic !== "all" && { label: "Topic", value: filters.topic },
  ].filter(Boolean) as { label: string; value: string }[];

  const sortLabel = sortOrder === "asc" ? "Low to High" : "High to Low";

  return (
    <Card variant="default" padding="sm" className="mb-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Filter Results
          </h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={toggleSort}
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <span>Score: {sortLabel}</span>
              {sortOrder === "asc" ? (
                <FaSortUp className="h-3 w-3" />
              ) : (
                <FaSortDown className="h-3 w-3" />
              )}
            </button>
            {activeFilters.length > 0 && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaUndoAlt className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Category"
            value={filters.category}
            options={filterOptions.categories}
            onChange={(newValue) =>
              handleFilterChange("category", String(newValue))
            }
          />
          <FilterSelect
            label="Subject"
            value={filters.subject}
            options={filterOptions.subjects}
            onChange={(newValue) =>
              handleFilterChange("subject", String(newValue))
            }
          />
          <FilterSelect
            label="Topic"
            value={filters.topic}
            options={filterOptions.topics}
            onChange={(newValue) =>
              handleFilterChange("topic", String(newValue))
            }
          />
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((item) => (
              <span
                key={`${item.label}-${item.value}`}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-200"
              >
                {item.label}: {item.value}
                <button
                  onClick={() =>
                    handleFilterChange(
                      item.label.toLowerCase() as keyof Filters,
                      "all",
                    )
                  }
                  className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <FaTimes className="h-2 w-2" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AttemptFilter;
