import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  ExamBuilderState,
  ExamBuilderInput,
  SectionInput,
  QuestionInput,
  OptionInput,
} from "@/types/examBuilder";
import { validateExamBuilder } from "@/utils/validation/examBuilderValidator";

const DEFAULT_EXAM: ExamBuilderInput = {
  exam_id: "",
  exam_name: "",
  type: "full_tests",
  category: "",
  difficulty: "medium",
  duration_minutes: 180,
  total_marks: 100,
  total_questions: 0,
  marking_scheme: {
    correct_answer: 4,
    incorrect_answer: -1,
    unattempted: 0,
  },
  sections: [],
};

const DEFAULT_SECTION: SectionInput = {
  section_id: "",
  section_name: "",
  instructions: "",
  questions: [],
};

const DEFAULT_QUESTION: QuestionInput = {
  q_id: "",
  text: "",
  options: [
    { opt_id: "1", text: "" },
    { opt_id: "2", text: "" },
    { opt_id: "3", text: "" },
    { opt_id: "4", text: "" },
  ],
  correct_opt_id: "1",
  difficulty: "medium",
};

const STORAGE_KEY = "examBuilder_state";

export const useExamBuilderStore = create(
  immer<ExamBuilderState>((set, get) => ({
    exam: DEFAULT_EXAM,
    currentStep: 0,
    isDirty: false,
    validationErrors: [],
    activeSection: 0,
    activeQuestion: 0,
    isSubmitting: false,
    lastSaved: undefined,

    updateExamField: (field, value) =>
      set((state) => {
        const keys = field.split(".");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = state.exam;
        for (let i = 0; i < keys.length - 1; i++) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          current = current[keys[i]];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        current[keys[keys.length - 1]] = value;
        state.isDirty = true;
      }),

    updateSection: (sectionIndex, sectionData) => {
      set((state) => {
        const section = state.exam.sections[sectionIndex];
        if (section) {
          Object.assign(section, sectionData);
          state.isDirty = true;
        }
      });
    },

    addSection: () => {
      set((state) => {
        const newSection: SectionInput = {
          ...DEFAULT_SECTION,
          section_id: `section_${state.exam.sections.length + 1}`,
          section_name: `Section ${state.exam.sections.length + 1}`,
        };
        state.exam.sections.push(newSection);
        state.isDirty = true;
        state.activeSection = state.exam.sections.length - 1;
      });
    },

    removeSection: (sectionIndex) => {
      set((state) => {
        state.exam.sections.splice(sectionIndex, 1);
        state.exam.total_questions = state.exam.sections.reduce(
          (sum, section) => sum + section.questions.length,
          0,
        );
        state.isDirty = true;
        state.activeSection = Math.max(0, sectionIndex - 1);
      });
    },

    updateQuestion: (sectionIndex, questionIndex, questionData) => {
      set((state) => {
        const question =
          state.exam.sections[sectionIndex]?.questions[questionIndex];
        if (question) {
          Object.assign(question, questionData);
          state.isDirty = true;
        }
      });
    },

    addQuestion: (sectionIndex) => {
      set((state) => {
        const section = state.exam.sections[sectionIndex];
        if (section) {
          const newQuestion: QuestionInput = {
            ...DEFAULT_QUESTION,
            q_id: `q_${Date.now()}`,
          };
          section.questions.push(newQuestion);
          state.exam.total_questions = state.exam.sections.reduce(
            (sum, s) => sum + s.questions.length,
            0,
          );
          state.isDirty = true;
        }
      });
    },

    removeQuestion: (sectionIndex, questionIndex) => {
      set((state) => {
        const section = state.exam.sections[sectionIndex];
        if (section) {
          section.questions.splice(questionIndex, 1);
          state.exam.total_questions = state.exam.sections.reduce(
            (sum, s) => sum + s.questions.length,
            0,
          );
          state.isDirty = true;
        }
      });
    },

    updateOption: (sectionIndex, questionIndex, optionIndex, optionData) => {
      set((state) => {
        const option =
          state.exam.sections[sectionIndex]?.questions[questionIndex]?.options[
            optionIndex
          ];
        if (option) {
          Object.assign(option, optionData);
          state.isDirty = true;
        }
      });
    },

    addOption: (sectionIndex, questionIndex) => {
      set((state) => {
        const question =
          state.exam.sections[sectionIndex]?.questions[questionIndex];
        if (question) {
          const maxOptId = Math.max(
            ...question.options.map((opt) => parseInt(opt.opt_id) || 0),
          );
          const newOption: OptionInput = {
            opt_id: String(maxOptId + 1),
            text: "",
          };
          question.options.push(newOption);
          state.isDirty = true;
        }
      });
    },

    removeOption: (sectionIndex, questionIndex, optionIndex) => {
      set((state) => {
        const question =
          state.exam.sections[sectionIndex]?.questions[questionIndex];
        if (question && question.options.length > 2) {
          const removedOption = question.options[optionIndex];
          question.options.splice(optionIndex, 1);
          if (question.correct_opt_id === removedOption.opt_id) {
            question.correct_opt_id = question.options[0]?.opt_id || "1";
          }
          state.isDirty = true;
        }
      });
    },

    setCurrentStep: (step) => {
      set((state) => {
        state.currentStep = step;
      });
    },

    setActiveSection: (index) => {
      set((state) => {
        state.activeSection = index;
      });
    },

    setActiveQuestion: (index) => {
      set((state) => {
        state.activeQuestion = index;
      });
    },

    setValidationErrors: (errors) => {
      set((state) => {
        state.validationErrors = errors;
      });
    },

    validateExam: () => {
      return validateExamBuilder(get().exam);
    },

    saveToLocalStorage: () => {
      const state = get();
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            exam: state.exam,
            lastSaved: Date.now(),
          }),
        );
        set((state) => {
          state.lastSaved = Date.now();
          state.isDirty = false;
        });
        return true;
      } catch (error) {
        console.error("Failed to save exam builder state:", error);
        return false;
      }
    },

    loadFromLocalStorage: () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as {
            exam: ExamBuilderInput;
            lastSaved: number;
          };
          set((state) => {
            state.exam = parsed.exam;
            state.lastSaved = parsed.lastSaved;
            state.isDirty = false;
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error("Failed to load exam builder state:", error);
        return false;
      }
    },

    reset: () => {
      try {
        set((state) => {
          state.exam = DEFAULT_EXAM;
          state.currentStep = 0;
          state.isDirty = false;
          state.validationErrors = [];
          state.activeSection = 0;
          state.activeQuestion = 0;
          state.isSubmitting = false;
        });
        localStorage.removeItem(STORAGE_KEY);
        return true;
      } catch (error) {
        console.error("Failed to reset exam builder state:", error);
        set((state) => {
          state.exam = DEFAULT_EXAM;
          state.currentStep = 0;
          state.isDirty = false;
          state.validationErrors = [];
          state.activeSection = 0;
          state.activeQuestion = 0;
          state.isSubmitting = false;
        });
        return false;
      }
    },

    exportExam: () => {
      return JSON.stringify(get().exam, null, 2);
    },

    importExam: (jsonString) => {
      try {
        const exam = JSON.parse(jsonString) as ExamBuilderInput;
        const validation = validateExamBuilder(exam);

        if (validation.isValid) {
          set((state) => {
            state.exam = exam;
            state.isDirty = false;
            state.validationErrors = [];
          });
          return true;
        } else {
          set((state) => {
            state.validationErrors = validation.errors;
          });
          return false;
        }
      } catch {
        set((state) => {
          state.validationErrors = [
            {
              field: "import",
              message: "Invalid JSON format. Please check the file content.",
            },
          ];
        });
        return false;
      }
    },
  })),
);
