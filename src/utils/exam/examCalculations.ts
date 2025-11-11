import type { Exam, Question, Section } from "@/types";

const sum = (nums: number[]): number => nums.reduce((a, b) => a + (b || 0), 0);
const toNumber = (
  v: number | string | { actual?: number; total?: number } | undefined,
): number => {
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null) {
    if ("actual" in v && typeof v.actual === "number") return v.actual;
    if ("total" in v && typeof v.total === "number") return v.total;
  }
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const getQuestionMarks = (q: Question): number => toNumber(q.marks) || 1;
export const getTotalMarks = (exam: Exam): number =>
  exam?.sections
    ? sum(
        exam.sections.flatMap((s) => (s.questions || []).map(getQuestionMarks)),
      )
    : 0;
export const getTotalQuestions = (exam: Exam): number =>
  exam?.sections ? sum(exam.sections.map((s) => s.questions?.length || 0)) : 0;
export const getSectionTotalMarks = (s: Section): number =>
  sum(s.questions.map(getQuestionMarks));
