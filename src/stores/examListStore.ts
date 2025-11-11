import { Exam } from "@/types";
import { fetchExams, getExamById } from "@/services/dataService";
import { createPersistedStore } from "@/stores/createPersistedStore";

interface ExamListState {
  exams: Exam[];
  loading: boolean;
  loadExams: () => Promise<void>;
  getExam: (examId: string) => Exam | undefined;
  addCustomExam: (exam: Exam) => void;
  removeCustomExam: (examId: string) => void;
  clearCustomExams: () => void;
}

export const examListStore = createPersistedStore<ExamListState>(
  (set, get) => ({
    exams: [],
    loading: false,

    loadExams: async () => {
      if (get().loading) return;
      set({ loading: true });
      try {
        const exams = await fetchExams();
        set({ exams, loading: false });
      } catch (e) {
        console.error("Failed loading exams", e);
        set({ loading: false });
      }
    },

    getExam: (examId) => getExamById(get().exams, examId),

    addCustomExam: (exam: Exam) => {
      set((state) => {
        const existingIndex = state.exams.findIndex(
          (e) => e.exam_id === exam.exam_id,
        );
        if (existingIndex >= 0) {
          const updatedExams = [...state.exams];
          updatedExams[existingIndex] = exam;
          return { exams: updatedExams };
        }
        return { exams: [...state.exams, exam] };
      });
    },

    removeCustomExam: (examId: string) => {
      set((state) => ({
        exams: state.exams.filter((exam) => exam.exam_id !== examId),
      }));
    },

    clearCustomExams: () => {
      set((state) => ({
        exams: state.exams.filter((exam) => !exam.is_custom),
      }));
    },
  }),
  { name: "exam-storage" },
);
