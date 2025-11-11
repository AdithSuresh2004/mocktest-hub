export interface MarkingSchemeInput {
  correct_answer: number;
  incorrect_answer: number;
  unattempted: number;
}

export interface OptionInput {
  opt_id: string;
  text: string;
  image?: string;
}

export interface QuestionInput {
  q_id: string;
  text: string;
  image?: string;
  options: OptionInput[];
  correct_opt_id: string;
  difficulty?: "easy" | "medium" | "hard";
  marks?: number;
  negative_marks?: number;
  explanation?: string;
}

export interface SectionInput {
  section_id: string;
  section_name: string;
  max_marks?: number;
  question_count?: number;
  instructions?: string;
  questions: QuestionInput[];
}

export interface ExamBuilderInput {
  exam_id: string;
  exam_name: string;
  type: "full_tests" | "subject_tests" | "topic_tests";
  category: string;
  subject?: string;
  subjects?: string[];
  topic?: string;
  topics?: string[];
  difficulty: "easy" | "medium" | "hard";
  duration_minutes: number;
  total_marks: number;
  total_questions: number;
  marking_scheme: MarkingSchemeInput;
  medium?: string[];
  instructions?: string;
  sections: SectionInput[];
}

export interface ValidationError {
  field: string;
  message: string;
  path?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
}

export interface ExamBuilderStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}

export interface ExamBuilderState {
  exam: ExamBuilderInput;
  currentStep: number;
  isDirty: boolean;
  validationErrors: ValidationError[];
  activeSection: number;
  activeQuestion: number;
  isSubmitting: boolean;
  lastSaved?: number;

  updateExamField: (field: string, value: unknown) => void;
  updateSection: (sectionIndex: number, section: Partial<SectionInput>) => void;
  addSection: () => void;
  removeSection: (sectionIndex: number) => void;
  updateQuestion: (
    sectionIndex: number,
    questionIndex: number,
    question: Partial<QuestionInput>,
  ) => void;
  addQuestion: (sectionIndex: number) => void;
  removeQuestion: (sectionIndex: number, questionIndex: number) => void;
  updateOption: (
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number,
    option: Partial<OptionInput>,
  ) => void;
  addOption: (sectionIndex: number, questionIndex: number) => void;
  removeOption: (
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number,
  ) => void;
  setCurrentStep: (step: number) => void;
  setActiveSection: (index: number) => void;
  setActiveQuestion: (index: number) => void;
  setValidationErrors: (errors: ValidationError[]) => void;
  validateExam: () => ValidationResult;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;
  reset: () => void;
  exportExam: () => string;
  importExam: (jsonString: string) => boolean;
}
