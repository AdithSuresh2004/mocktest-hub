import { FILTER_OPTIONS } from "@/constants/filters";
import {
  TEST_TYPE_CONFIG,
  DEFAULT_TEST_CONFIG,
  DIFFICULTY_LEVELS,
  DIFFICULTY_BADGE_COLORS,
  DEFAULT_DIFFICULTY_COLOR,
} from "@/constants/exam";
import { calculatePercentage, countBy } from "@/utils/common";
import type { Exam, Question, TabId } from "@/types";

export const getTestTypeConfig = (type: string) =>
  TEST_TYPE_CONFIG[type as keyof typeof TEST_TYPE_CONFIG] ||
  DEFAULT_TEST_CONFIG;

export const normalizeDifficulty = (strength: string) =>
  strength ? strength.toLowerCase() : DIFFICULTY_LEVELS.MEDIUM;

export const getDifficultyBadgeColor = (strength: string) => {
  const normalized = normalizeDifficulty(strength);
  return (
    DIFFICULTY_BADGE_COLORS[
      normalized as keyof typeof DIFFICULTY_BADGE_COLORS
    ] || DEFAULT_DIFFICULTY_COLOR
  );
};

export const normalizeTests = (exams: Exam[]): Exam[] =>
  exams.map((exam) => ({
    ...exam,
    exam_strength: exam.difficulty || exam.exam_strength,
  }));

export const getExamNames = (tests: Exam[]): string[] => {
  const categories = new Set(tests.map((t) => t.category).filter(Boolean));
  return [
    "All Exams",
    ...Array.from(categories)
      .map((cat) => cat!.toUpperCase())
      .sort(),
  ];
};

const collectValues = (
  tests: Exam[],
  getValue: (t: Exam) => string | string[] | undefined,
): string[] => {
  const values = new Set<string>();
  tests.forEach((t) => {
    const value = getValue(t);
    const items = Array.isArray(value) ? value : value ? [value] : [];
    items.forEach((v) => values.add(v));
  });
  return Array.from(values).filter(Boolean).sort();
};

export const getTopics = (tests: Exam[]): string[] => [
  "All Topics",
  ...collectValues(tests, (t) => t.topics || t.topic),
];

export const getSubjects = (tests: Exam[]): string[] => [
  "All Subjects",
  ...collectValues(tests, (t) => t.subjects || t.subject),
];

export const calculateTabCounts = (
  tests: Exam[],
): { id: TabId; label: string; count: number }[] => {
  return FILTER_OPTIONS.TEST_TYPES.map((type) => ({
    id: type.id as TabId,
    label: type.label,
    count:
      type.id === "all"
        ? tests.length
        : tests.filter((t) => t.type === type.id).length,
  }));
};

const normalizeToArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export const getExamSubjects = (test: Exam): string[] =>
  normalizeToArray(test.subjects || test.subject);

export const getExamTopics = (test: Exam): string[] =>
  normalizeToArray(test.topics || test.topic);

export const getAllTags = (
  test: Exam,
): { text: string; type: "subject" | "topic" }[] => {
  const createTags = (items: string[], type: "subject" | "topic") =>
    items.filter(Boolean).map((text) => ({ text, type }));

  return [
    ...createTags(getExamSubjects(test), "subject"),
    ...createTags(getExamTopics(test), "topic"),
  ];
};

export const getExamState = (
  exam: Exam | null | undefined,
  currentSection: number,
  currentQuestion: number,
) => {
  const EMPTY_STATE = {
    currentSectionObj: { section_name: "", questions: [] },
    currentQ: null,
    totalQuestions: 0,
    canGoPrev: false,
    canGoNext: false,
  };

  if (!exam) return EMPTY_STATE;

  const currentSectionObj =
    exam.sections?.[currentSection] || EMPTY_STATE.currentSectionObj;
  const currentQ = currentSectionObj.questions[currentQuestion] || null;
  const totalQuestions =
    exam.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0;
  const canGoPrev = currentSection > 0 || currentQuestion > 0;
  const canGoNext =
    currentSection < exam.sections.length - 1 ||
    currentQuestion < currentSectionObj.questions.length - 1;

  return {
    currentSectionObj,
    currentQ,
    totalQuestions,
    canGoPrev,
    canGoNext,
  };
};

export const getAnsweredCount = (
  answers: Record<string, string>,
  totalQuestions: number,
) => {
  const answeredCount = Object.keys(answers).length;
  return {
    answered: answeredCount,
    total: totalQuestions,
    percentage: calculatePercentage(answeredCount, totalQuestions),
  };
};

export const calculateSectionStats = (
  questions: Question[] = [],
  answers: Record<string, string> = {},
  markedForReview: Set<string> = new Set(),
  isReviewMode: boolean = false,
) => {
  const answered = countBy(questions, (q) => answers[q.q_id] != null);
  const incorrect = isReviewMode
    ? countBy(
        questions,
        (q) => answers[q.q_id] != null && answers[q.q_id] !== q.correct_opt_id,
      )
    : 0;
  const notVisited = countBy(
    questions,
    (q) => answers[q.q_id] == null && !markedForReview.has(q.q_id),
  );

  return {
    total: questions.length,
    answered,
    incorrect,
    marked: markedForReview.size,
    notVisited,
  };
};

export const getResponsesFromAnswers = (answers: Record<string, string>) =>
  Object.entries(answers).map(([q_id, selected_opt_id]) => ({
    q_id,
    selected_opt_id,
  }));

export const sortTests = (tests: Exam[], sortOrder: string): Exam[] => {
  const SORT_FUNCTIONS: Record<string, (a: Exam, b: Exam) => number> = {
    "name-asc": (a, b) => a.exam_name.localeCompare(b.exam_name),
    "name-desc": (a, b) => b.exam_name.localeCompare(a.exam_name),
    "strength-asc": (a, b) =>
      (a.exam_strength || "").localeCompare(b.exam_strength || ""),
    "strength-desc": (a, b) =>
      (b.exam_strength || "").localeCompare(a.exam_strength || ""),
  };

  const sortFn = SORT_FUNCTIONS[sortOrder];
  return sortFn ? [...tests].sort(sortFn) : tests;
};
