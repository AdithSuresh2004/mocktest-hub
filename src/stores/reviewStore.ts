import { create } from "zustand";
import { attemptStore } from "@/stores/attemptStore";
import { examListStore } from "@/stores/examListStore";
import { Exam, Attempt } from "@/types";

interface ReviewState {
  attempt: Attempt | null;
  exam: Exam | null;
  loading: boolean;
  error: string | null;
  currentSection: number;
  currentQuestion: number;
  loadReviewData: (attemptId: string) => Promise<void>;
  navigateToQuestion: (sectionIndex: number, questionIndex: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
}

export const reviewStore = create<ReviewState>((set, get) => ({
  attempt: null,
  exam: null,
  loading: true,
  error: null,
  currentSection: 0,
  currentQuestion: 0,

  loadReviewData: async (attemptId) => {
    set({ loading: true, error: null });
    const attempt = attemptStore.getState().getItem(attemptId);
    if (!attempt) {
      set({ loading: false, error: "Attempt not found" });
      return;
    }
    const examListState = examListStore.getState();
    if (examListState.exams.length === 0) {
      await examListState.loadExams();
    }
    const exam = examListState.getExam(attempt.exam_id);
    if (!exam) {
      set({ loading: false, error: "Exam not found" });
      return;
    }
    set({ attempt, exam, loading: false });
  },

  navigateToQuestion: (sectionIndex, questionIndex) => {
    set({ currentSection: sectionIndex, currentQuestion: questionIndex });
  },

  goToNext: () => {
    const exam = get().exam;
    if (!exam) return;
    const { currentSection, currentQuestion } = get();
    const section = exam.sections[currentSection];
    if (currentQuestion < section.questions.length - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    } else if (currentSection < exam.sections.length - 1) {
      set({ currentSection: currentSection + 1, currentQuestion: 0 });
    }
  },

  goToPrev: () => {
    const exam = get().exam;
    if (!exam) return;
    const { currentSection, currentQuestion } = get();
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
    } else if (currentSection > 0) {
      const prevSection = exam.sections[currentSection - 1];
      set({
        currentSection: currentSection - 1,
        currentQuestion: prevSection.questions.length - 1,
      });
    }
  },
}));
