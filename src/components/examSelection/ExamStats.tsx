import type { ExamStatsProps } from "@/types/components-props";

const ExamStats = ({ filteredTests, allTests }: ExamStatsProps) => {
  if (filteredTests.length === 0) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-400">No tests found</p>
    );
  }

  return (
    <p className="text-sm text-gray-600 dark:text-gray-400">
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
    </p>
  );
};

export default ExamStats;
