import { create } from "zustand";
import {
  Attempt,
  Exam,
  Analysis,
  PerformanceLevel,
  EnrichedAnalysis,
} from "@/types";
import { attemptStore } from "@/stores/attemptStore";
import { examListStore } from "@/stores/examListStore";
import { calculateAnalysis } from "@/utils/exam/attemptCalculations";
import { getPerformanceLevel } from "@/utils/exam/performanceCalculations";
import { createErrorState, createLoadingState } from "@/utils/common";

interface ResultState {
  attempt: Attempt | null;
  exam: Exam | null;
  loading: boolean;
  error: string | null;
  analysis: Analysis | null;
  enrichedAnalysis: EnrichedAnalysis | null;
  loadResult: (attemptId: string) => Promise<void>;
}

const enrichAnalysisWithPerformance = (
  analysis: Analysis,
): EnrichedAnalysis => {
  const performanceLevel: PerformanceLevel = getPerformanceLevel(
    analysis.overall.percentage,
  );
  const scorePercentage =
    analysis.score.total > 0
      ? (analysis.score.actual / analysis.score.total) * 100
      : 0;
  const scorePerformanceLevel: PerformanceLevel =
    getPerformanceLevel(scorePercentage);
  const accuracyPercentage = analysis.accuracy.percentage || 0;
  const accuracyPerformanceLevel: PerformanceLevel =
    getPerformanceLevel(accuracyPercentage);

  return {
    ...analysis,
    overall: {
      ...analysis.overall,
      percentage: Math.round(analysis.overall.percentage),
      ...performanceLevel,
    },
    score: {
      ...analysis.score,
      ...scorePerformanceLevel,
    },
    accuracy: {
      ...analysis.accuracy,
      percentage: Math.round(accuracyPercentage),
      ...accuracyPerformanceLevel,
    },
    speed: {
      text: "Good",
      color: "text-green-600 dark:text-green-400",
    },
  };
};

export const resultStore = create<ResultState>((set) => ({
  attempt: null,
  exam: null,
  loading: true,
  error: null,
  analysis: null,
  enrichedAnalysis: null,

  loadResult: async (attemptId) => {
    set({ ...createLoadingState(), analysis: null, enrichedAnalysis: null });

    const { getAttempt } = attemptStore.getState();
    const attempt = getAttempt(attemptId);

    if (!attempt) {
      set(createErrorState("Attempt not found"));
      return;
    }

    if (attempt.status !== "completed") {
      set(createErrorState("This attempt is not completed yet"));
      return;
    }

    const examListState = examListStore.getState();

    if (examListState.exams.length === 0) {
      await examListState.loadExams();
    }

    let exam = examListState.getExam(attempt.exam_id);

    if (!exam) {
      await examListState.loadExams();
      exam = examListState.getExam(attempt.exam_id);
    }

    if (!exam) {
      set(createErrorState("Exam not found for this attempt"));
      return;
    }

    const analysis = calculateAnalysis(exam, attempt);
    const enrichedAnalysis = enrichAnalysisWithPerformance(analysis);

    set({
      attempt,
      exam,
      analysis,
      enrichedAnalysis,
      loading: false,
      error: null,
    });
  },
}));
