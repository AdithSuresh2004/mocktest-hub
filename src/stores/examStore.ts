import { create } from "zustand";
import { timerService } from "@/services/timerService";
import { Exam, Attempt, UIState } from "@/types";

interface ExamState extends Omit<UIState, "answers"> {
  exam: Exam | null;
  attempt: Attempt | null;
  loading: boolean;
  isSubmitted: boolean;
  isTimeUp: boolean;
  hasStarted: boolean;
  seconds: number;
  timeUpCallback: (() => void) | null;
  answers: Record<string, string>;
  currentSection: number;
  currentQuestion: number;
}

interface ExamActions {
  loadExam: (
    exam: Exam,
    attempt: Attempt | null,
    timeUpCallback?: () => void,
  ) => void;
  startTimer: () => void;
  stopTimer: () => void;
  setTimeUp: (isTimeUpValue: boolean) => void;
  setSubmitted: () => void;
  resetExamState: () => void;
  goToQuestion: (sectionIndex: number, questionIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToSection: (sectionIndex: number) => void;
  saveAnswer: (questionId: string, optionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
}

const initialState: Omit<ExamState, keyof ExamActions> = {
  exam: null,
  attempt: null,
  loading: true,
  isSubmitted: false,
  isTimeUp: false,
  hasStarted: false,
  answers: {} as Record<string, string>,
  markedForReview: new Set(),
  currentSection: 0,
  currentQuestion: 0,
  seconds: 0,
  timeUpCallback: null,
};

export const examStore = create<ExamState & ExamActions>((set, get) => ({
  ...initialState,

  loadExam: (
    exam: Exam,
    attempt: Attempt | null,
    timeUpCallback?: () => void,
  ) => {
    if (attempt) {
      set({
        exam,
        attempt,
        loading: false,
        answers: attempt.responses.reduce(
          (acc: Record<string, string>, res) => {
            acc[res.q_id] = res.selected_opt_id;
            return acc;
          },
          {},
        ),
        markedForReview: new Set(attempt._markedForReview || []),
        currentSection: attempt._currentSection || 0,
        currentQuestion: attempt._currentQuestion || 0,
        seconds: attempt._timeRemainingSeconds || 0,
        hasStarted: attempt._hasStarted || false,
        isSubmitted: false,
        isTimeUp: false,
        timeUpCallback,
      });
    } else {
      set({
        exam,
        attempt: null,
        loading: false,
        answers: {},
        markedForReview: new Set(),
        currentSection: 0,
        currentQuestion: 0,
        seconds: exam.duration_minutes * 60,
        hasStarted: false,
        isSubmitted: false,
        isTimeUp: false,
        timeUpCallback,
      });
    }
  },

  startTimer: () => {
    const { seconds } = get();
    timerService.startTimer(
      (newSeconds) => set({ seconds: newSeconds }),
      () => get().setTimeUp(true),
      seconds,
    );
    set({ hasStarted: true });
  },

  stopTimer: () => timerService.stopTimer(),

  setTimeUp: (isTimeUpValue) => {
    timerService.stopTimer();
    set({ isTimeUp: isTimeUpValue, seconds: 0 });
    if (isTimeUpValue && get().timeUpCallback) {
      get().timeUpCallback?.();
    }
  },

  setSubmitted: () => {
    timerService.stopTimer();
    set({ isSubmitted: true });
  },

  resetExamState: () => {
    timerService.stopTimer();
    set(initialState);
  },

  goToQuestion: (sectionIndex, questionIndex) => {
    set({ currentSection: sectionIndex, currentQuestion: questionIndex });
  },

  nextQuestion: () => {
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

  prevQuestion: () => {
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

  goToSection: (sectionIndex) => {
    set({ currentSection: sectionIndex, currentQuestion: 0 });
  },

  saveAnswer: (questionId: string, optionId: string) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    }));
  },

  toggleMarkForReview: (questionId: string) => {
    set((state) => {
      const marked = new Set(state.markedForReview);
      if (marked.has(questionId)) {
        marked.delete(questionId);
      } else {
        marked.add(questionId);
      }
      return { markedForReview: marked };
    });
  },
}));
