import { Attempt, Exam } from "@/types";

export interface EnrichedAttempt extends Attempt {
  exam?: Exam;
  examName?: string;
  category?: string;
  subjects?: string[];
  topics?: string[];
}

export const enrichAttempts = (
  attempts: Attempt[],
  exams: Exam[],
): EnrichedAttempt[] => {
  const examMap = new Map(exams.map((e) => [e.exam_id, e]));
  return attempts.map((a) => {
    const exam = examMap.get(a.exam_id);
    return {
      ...a,
      exam,
      examName: exam?.exam_name,
      category: exam?.category,
      subjects: exam?.subjects || [],
      topics: exam?.topics || [],
    };
  });
};

const getScore = (a: EnrichedAttempt): number =>
  typeof a.score === "number" ? a.score : a.score?.actual || 0;

export const getFilterOptions = (attempts: EnrichedAttempt[]) => ({
  categories: [
    "all",
    ...new Set(attempts.map((a) => a.category).filter(Boolean)),
  ] as string[],
  subjects: [
    "all",
    ...new Set(attempts.flatMap((a) => a.subjects || [])),
  ] as string[],
  topics: [
    "all",
    ...new Set(attempts.flatMap((a) => a.topics || [])),
  ] as string[],
});

export const getFilteredAttempts = (
  attempts: EnrichedAttempt[],
  filters: { category: string; subject: string; topic: string },
) =>
  attempts.filter((a) => {
    if (filters.category !== "all" && a.category !== filters.category)
      return false;
    if (filters.subject !== "all" && !a.subjects?.includes(filters.subject))
      return false;
    if (filters.topic !== "all" && !a.topics?.includes(filters.topic))
      return false;
    return true;
  });

export const getSortedAttempts = (
  attempts: EnrichedAttempt[],
  order: "asc" | "desc",
) =>
  [...attempts].sort((a, b) =>
    order === "asc" ? getScore(a) - getScore(b) : getScore(b) - getScore(a),
  );
