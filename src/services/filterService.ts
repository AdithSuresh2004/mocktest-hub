import { Exam, Attempt } from "@/types";
import { getExamSubjects, getExamTopics } from "./examService";

export interface ExamFilters {
  activeTab?: string;
  searchTerm?: string;
  selectedExam?: string;
  selectedTopic?: string;
  selectedSubject?: string;
  selectedStrength?: string;
  selectedAttemptStatus?: string;
}

const isFilterActive = (value?: string): boolean =>
  !!(value && value !== "all" && !value.startsWith("All"));

const matchesValue = (
  examValue: string | string[] | undefined,
  filterValue?: string,
): boolean => {
  if (!isFilterActive(filterValue)) return true;
  if (Array.isArray(examValue)) {
    return examValue.some(
      (val) => val.toLowerCase() === filterValue!.toLowerCase(),
    );
  }
  return examValue?.toLowerCase() === filterValue?.toLowerCase();
};

const matchesSubjects = (exam: Exam, filterValue?: string): boolean => {
  if (!isFilterActive(filterValue)) return true;
  return getExamSubjects(exam).some(
    (subject) => subject.toLowerCase() === filterValue!.toLowerCase(),
  );
};

const matchesTopics = (exam: Exam, filterValue?: string): boolean => {
  if (!isFilterActive(filterValue)) return true;
  return getExamTopics(exam).some(
    (topic) => topic.toLowerCase() === filterValue!.toLowerCase(),
  );
};

export const filterExams = (
  exams: Exam[],
  filters: ExamFilters,
  attemptedExams: Set<string> = new Set(),
): Exam[] => {
  const predicates = [
    (e: Exam) =>
      !filters.activeTab ||
      filters.activeTab === "all" ||
      e.type === filters.activeTab,
    (e: Exam) =>
      !filters.searchTerm ||
      e.exam_name.toLowerCase().includes(filters.searchTerm.toLowerCase()),
    (e: Exam) => matchesValue(e.category, filters.selectedExam),
    (e: Exam) => matchesTopics(e, filters.selectedTopic),
    (e: Exam) => matchesSubjects(e, filters.selectedSubject),
    (e: Exam) => matchesValue(e.exam_strength, filters.selectedStrength),
    (e: Exam) => {
      if (
        !filters.selectedAttemptStatus ||
        filters.selectedAttemptStatus === "all"
      )
        return true;
      const attempted = attemptedExams.has(e.exam_id);
      return filters.selectedAttemptStatus === "attempted"
        ? attempted
        : !attempted;
    },
  ];

  return exams.filter((exam) =>
    predicates.every((predicate) => predicate(exam)),
  );
};

export const hasActiveFilters = (filters: ExamFilters): boolean =>
  [
    filters.searchTerm,
    filters.selectedExam,
    filters.selectedTopic,
    filters.selectedSubject,
    filters.selectedStrength,
    filters.selectedAttemptStatus,
  ].some((value) => value && isFilterActive(value));

export const getUniqueValues = (exams: Exam[], field: keyof Exam): string[] => {
  const values = new Set<string>();
  exams.forEach((exam) => {
    const value = exam[field];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === "string" || typeof v === "number") {
          values.add(String(v));
        }
      });
    } else if (typeof value === "string" || typeof value === "number") {
      values.add(String(value));
    }
  });
  return Array.from(values).filter(Boolean).sort();
};

export const getExamAttemptStatus = (examAttempts: Attempt[]): string => {
  if (examAttempts.length === 0) return "not_attempted";
  if (examAttempts.some((att) => att.status === "in_progress")) {
    return "in_progress";
  }
  if (examAttempts.some((att) => att.status === "completed")) {
    return "completed";
  }
  return "not_attempted";
};

export const sortAttemptsByDate = (attempts: Attempt[]): Attempt[] =>
  [...attempts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

export const filterAttemptsByExam = (
  attempts: Attempt[],
  examId: string,
): Attempt[] => attempts.filter((attempt) => attempt.exam_id === examId);

export const filterCompletedAttempts = (attempts: Attempt[]): Attempt[] =>
  attempts.filter((attempt) => attempt.status === "completed");

export const filterInProgressAttempts = (attempts: Attempt[]): Attempt[] =>
  attempts.filter((attempt) => attempt.status === "in_progress");
