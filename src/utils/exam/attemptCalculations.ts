import {
  calculatePercentage,
  sum,
  toMap,
  toNumber,
  calculateAccuracy,
} from "@/utils/common";
import {
  getQuestionMarks,
  getTotalQuestions,
  getSectionTotalMarks,
} from "@/utils/exam/examCalculations";
import type {
  Exam,
  Attempt,
  SectionAnalysis,
  Section,
  Response,
  MarkingScheme,
} from "@/types";

const calculateSectionTotals = (sectionAnalysis: SectionAnalysis[]) => ({
  correct: sum(sectionAnalysis.map((s) => s.correct)),
  incorrect: sum(sectionAnalysis.map((s) => s.incorrect)),
  unanswered: sum(sectionAnalysis.map((s) => s.unanswered)),
});

export const calculateOverallStats = (
  sectionAnalysis: SectionAnalysis[],
  totalQuestionsOverall: number,
) => {
  const totals = calculateSectionTotals(sectionAnalysis);
  const totalAttempted = totals.correct + totals.incorrect;

  return {
    correct: totals.correct,
    incorrect: totals.incorrect,
    unanswered: totals.unanswered,
    totalQuestions: totalQuestionsOverall,
    attempted: totalAttempted,
    accuracy: calculateAccuracy(totals.correct, totalAttempted, 1),
    percentage: calculatePercentage(totals.correct, totalQuestionsOverall, 1),
  };
};

export const createResponsesMap = (responses: Response[]) =>
  responses ? toMap(responses, (r) => r.q_id) : {};

export const analyzeSectionPerformance = (
  section: Section,
  sectionIndex: number,
  responsesMap: Record<string, Response>,
  sectionScores: Record<string, number>,
  markingScheme: MarkingScheme = {},
): SectionAnalysis => {
  const stats = { correct: 0, incorrect: 0, unanswered: 0 };
  let sectionMarks = 0;

  const sectionKey =
    section.section_id ||
    section.section_name?.[0] ||
    String.fromCharCode(65 + sectionIndex);
  const sectionTotalMarks = getSectionTotalMarks(section);

  section.questions.forEach((question) => {
    const response = responsesMap[question.q_id];
    const userAnswer = response?.selected_opt_id;
    const questionMarks = getQuestionMarks(question);

    if (!userAnswer) {
      stats.unanswered++;
      sectionMarks += markingScheme.unattempted || 0;
    } else if (userAnswer === question.correct_opt_id) {
      stats.correct++;
      sectionMarks += markingScheme.correct_answer || questionMarks;
    } else {
      stats.incorrect++;
      sectionMarks += markingScheme.incorrect_answer || 0;
    }
  });

  const totalAttempted = stats.correct + stats.incorrect;

  return {
    sectionName: section.section_name,
    ...stats,
    totalQuestions: section.questions.length,
    marksObtained: sectionScores[sectionKey] ?? sectionMarks,
    totalMarks: sectionTotalMarks,
    accuracy: calculatePercentage(stats.correct, totalAttempted, 1),
    stats,
  };
};

export const calculateAnalysis = (examData: Exam, attemptData: Attempt) => {
  const responsesMap = createResponsesMap(attemptData.responses);
  const sectionScores =
    (typeof attemptData.score === "object" && attemptData.score?.per_section) ||
    {};

  const sectionAnalysis = examData.sections.map(
    (section, sectionIndex: number) =>
      analyzeSectionPerformance(
        section,
        sectionIndex,
        responsesMap,
        sectionScores,
        examData.marking_scheme,
      ),
  );

  const totalQuestionsOverall = getTotalQuestions(examData);
  const overall = calculateOverallStats(sectionAnalysis, totalQuestionsOverall);

  const totalMarks = sum(sectionAnalysis.map((s) => s.totalMarks));
  const actualScore = sum(sectionAnalysis.map((s) => s.marksObtained));

  return {
    sectionAnalysis,
    overall,
    score: {
      actual: actualScore,
      total: totalMarks,
    },
    accuracy: {
      percentage: overall.accuracy,
    },
  };
};

export const getScore = (attempt: Attempt): number => {
  if (typeof attempt?.score === "object" && attempt.score !== null) {
    return (attempt.score.actual / attempt.score.total) * 100;
  }
  return toNumber(attempt?.score);
};

type AttemptWithExam = Attempt & { exam?: Exam };

export const calculateAttemptStats = (attempts: AttemptWithExam[]) => {
  if (!attempts?.length) {
    return {
      avgScore: 0,
      bestScore: 0,
      worstScore: 0,
      avgTime: 0,
      totalTime: 0,
      count: 0,
    };
  }

  const scores = attempts.map((attempt) => {
    if (
      typeof attempt.score === "object" &&
      attempt.score !== null &&
      typeof attempt.score.actual === "number" &&
      typeof attempt.score.total === "number" &&
      attempt.score.total > 0
    ) {
      return (attempt.score.actual / attempt.score.total) * 100;
    }
    if (
      typeof attempt.score === "number" &&
      "exam" in attempt &&
      attempt.exam &&
      typeof attempt.exam.total_marks === "number" &&
      attempt.exam.total_marks > 0
    ) {
      return (attempt.score / attempt.exam.total_marks) * 100;
    }
    if (typeof attempt.score === "number") {
      return attempt.score;
    }
    return 0;
  });
  const times = attempts.map((attempt) =>
    Math.max(0, toNumber(attempt.time_taken)),
  );
  const totalScore = sum(scores);
  const totalTime = sum(times);
  const count = attempts.length;

  return {
    avgScore: parseFloat((totalScore / count).toFixed(2)),
    bestScore: parseFloat(Math.max(...scores).toFixed(2)),
    worstScore: parseFloat(Math.min(...scores).toFixed(2)),
    avgTime: Math.round(totalTime / count),
    totalTime: Math.round(totalTime),
    count,
  };
};
