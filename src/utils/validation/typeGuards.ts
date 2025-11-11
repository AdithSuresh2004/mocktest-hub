import { Exam, Attempt, Question, Section, Response } from "@/types";

export const isExam = (value: unknown): value is Exam => {
  if (!value || typeof value !== "object") return false;
  const exam = value as Partial<Exam>;

  return (
    typeof exam.exam_id === "string" &&
    typeof exam.exam_name === "string" &&
    typeof exam.duration_minutes === "number" &&
    typeof exam.total_marks === "number" &&
    typeof exam.total_questions === "number" &&
    Array.isArray(exam.sections)
  );
};

export const isSection = (value: unknown): value is Section => {
  if (!value || typeof value !== "object") return false;
  const section = value as Partial<Section>;

  return (
    typeof section.section_name === "string" && Array.isArray(section.questions)
  );
};

export const isQuestion = (value: unknown): value is Question => {
  if (!value || typeof value !== "object") return false;
  const question = value as Partial<Question>;

  return (
    typeof question.q_id === "string" &&
    typeof question.text === "string" &&
    Array.isArray(question.options) &&
    typeof question.correct_opt_id === "string"
  );
};

export const isAttempt = (value: unknown): value is Attempt => {
  if (!value || typeof value !== "object") return false;
  const attempt = value as Partial<Attempt>;

  return (
    typeof attempt.id === "string" &&
    typeof attempt.exam_id === "string" &&
    typeof attempt.status === "string" &&
    typeof attempt.date === "string" &&
    Array.isArray(attempt.responses)
  );
};

export const isResponse = (value: unknown): value is Response => {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<Response>;

  return (
    typeof response.q_id === "string" &&
    typeof response.selected_opt_id === "string"
  );
};

export const isNotNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const isNotEmpty = <T>(arr: T[]): arr is [T, ...T[]] => {
  return arr.length > 0;
};

export const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};
