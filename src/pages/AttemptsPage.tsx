import { useEffect, useMemo, useState } from "react";
import { attemptStore } from "@/stores/attemptStore";
import { examListStore } from "@/stores/examListStore";
import {
  enrichAttempts,
  getFilterOptions,
  getFilteredAttempts,
  getSortedAttempts,
} from "@/utils/attemptsHelpers";
import { calculateAttemptStats } from "@/utils/exam/attemptCalculations";
import AttemptStats from "@/components/attempts/AttemptStats";
import AttemptFilter from "@/components/attempts/AttemptFilter";
import AttemptList from "@/components/attempts/AttemptList";
import Pagination from "@/components/common/Pagination";
import { usePagination } from "@/hooks/common/usePagination";
import PageContainer from "@/components/common/PageContainer";

const AttemptsPage = () => {
  const { attempts } = attemptStore();
  const { exams, loadExams } = examListStore();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    category: "all",
    subject: "all",
    topic: "all",
  });

  useEffect(() => {
    if (!exams.length) loadExams();
  }, [exams.length, loadExams]);

  const completedAttempts = useMemo(
    () =>
      enrichAttempts(
        Object.values(attempts).filter((a) => a.status === "completed"),
        exams,
      ),
    [attempts, exams],
  );

  const filterOptions = useMemo(
    () => getFilterOptions(completedAttempts),
    [completedAttempts],
  );

  const filteredAttempts = useMemo(
    () => getFilteredAttempts(completedAttempts, filters),
    [completedAttempts, filters],
  );

  const sorted = useMemo(
    () => getSortedAttempts(filteredAttempts, sortOrder),
    [filteredAttempts, sortOrder],
  );

  const stats = useMemo(
    () => calculateAttemptStats(completedAttempts),
    [completedAttempts],
  );
  const pagination = usePagination(sorted, 10);

  return (
    <div className="animate-fadeIn">
      <PageContainer>
        <div>
          <AttemptStats stats={stats} />
        </div>
        <div className="mt-8">
          <AttemptFilter
            filters={filters}
            filterOptions={filterOptions}
            handleFilterChange={(key, val) =>
              setFilters((f) => ({
                ...f,
                [key === "category"
                  ? "category"
                  : key === "subject"
                    ? "subject"
                    : "topic"]: val,
              }))
            }
            sortOrder={sortOrder}
            toggleSort={() =>
              setSortOrder((s) => (s === "asc" ? "desc" : "asc"))
            }
            onResetFilters={() =>
              setFilters({ category: "all", subject: "all", topic: "all" })
            }
          />
        </div>
        <div className="mt-8">
          <AttemptList attempts={pagination.paginatedItems} />
        </div>
        {pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination {...pagination} pageSizeOptions={[10, 20, 30, 50]} />
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default AttemptsPage;
