import {
  ExamBuilderInput,
  ValidationError,
  ValidationResult,
} from "@/types/examBuilder";

const EXAM_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
const DURATION_MIN = 1;
const DURATION_MAX = 480;
const MARKS_MIN = 1;
const MARKS_MAX = 10000;
const QUESTIONS_MIN = 1;
const QUESTIONS_MAX = 1000;

const validateExamBasics = (exam: ExamBuilderInput): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!exam.exam_id?.trim()) {
    errors.push({
      field: "exam_id",
      message: "Exam ID is required",
    });
  } else if (!EXAM_ID_PATTERN.test(exam.exam_id)) {
    errors.push({
      field: "exam_id",
      message:
        "Exam ID must contain only letters, numbers, hyphens, and underscores",
    });
  }

  if (!exam.exam_name?.trim()) {
    errors.push({
      field: "exam_name",
      message: "Exam name is required",
    });
  }

  if (!exam.category?.trim()) {
    errors.push({
      field: "category",
      message: "Category is required",
    });
  }

  if (!exam.type) {
    errors.push({
      field: "type",
      message: "Exam type is required",
    });
  }

  if (!exam.difficulty) {
    errors.push({
      field: "difficulty",
      message: "Difficulty level is required",
    });
  }

  return errors;
};

const validateDuration = (exam: ExamBuilderInput): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (exam.duration_minutes === undefined || exam.duration_minutes === null) {
    errors.push({
      field: "duration_minutes",
      message: "Duration is required",
    });
  } else if (
    exam.duration_minutes < DURATION_MIN ||
    exam.duration_minutes > DURATION_MAX
  ) {
    errors.push({
      field: "duration_minutes",
      message: `Duration must be between ${DURATION_MIN} and ${DURATION_MAX} minutes`,
    });
  }

  return errors;
};

const validateMarking = (exam: ExamBuilderInput): ValidationError[] => {
  const errors: ValidationError[] = [];
  const { marking_scheme } = exam;

  if (!marking_scheme) {
    errors.push({
      field: "marking_scheme",
      message: "Marking scheme is required",
    });
    return errors;
  }

  if (
    marking_scheme.correct_answer === undefined ||
    marking_scheme.correct_answer === null
  ) {
    errors.push({
      field: "marking_scheme.correct_answer",
      message: "Marks for correct answer is required",
    });
  } else if (marking_scheme.correct_answer <= 0) {
    errors.push({
      field: "marking_scheme.correct_answer",
      message: "Marks for correct answer must be positive",
    });
  }

  if (
    marking_scheme.incorrect_answer === undefined ||
    marking_scheme.incorrect_answer === null
  ) {
    errors.push({
      field: "marking_scheme.incorrect_answer",
      message: "Marks for incorrect answer is required",
    });
  } else if (marking_scheme.incorrect_answer > 0) {
    errors.push({
      field: "marking_scheme.incorrect_answer",
      message: "Marks for incorrect answer should be zero or negative",
    });
  }

  if (
    marking_scheme.unattempted === undefined ||
    marking_scheme.unattempted === null
  ) {
    errors.push({
      field: "marking_scheme.unattempted",
      message: "Marks for unattempted is required",
    });
  } else if (
    marking_scheme.unattempted !== 0 &&
    marking_scheme.unattempted > 0
  ) {
    errors.push({
      field: "marking_scheme.unattempted",
      message: "Marks for unattempted should be zero or negative",
    });
  }

  return errors;
};

const validateMarks = (exam: ExamBuilderInput): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (exam.total_marks === undefined || exam.total_marks === null) {
    errors.push({
      field: "total_marks",
      message: "Total marks is required",
    });
  } else if (exam.total_marks < MARKS_MIN || exam.total_marks > MARKS_MAX) {
    errors.push({
      field: "total_marks",
      message: `Total marks must be between ${MARKS_MIN} and ${MARKS_MAX}`,
    });
  }

  return errors;
};

const validateQuestions = (exam: ExamBuilderInput): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (exam.total_questions === undefined || exam.total_questions === null) {
    errors.push({
      field: "total_questions",
      message: "Total questions count is required",
    });
  } else if (
    exam.total_questions < QUESTIONS_MIN ||
    exam.total_questions > QUESTIONS_MAX
  ) {
    errors.push({
      field: "total_questions",
      message: `Total questions must be between ${QUESTIONS_MIN} and ${QUESTIONS_MAX}`,
    });
  }

  return errors;
};

const validateSections = (exam: ExamBuilderInput): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!exam.sections || exam.sections.length === 0) {
    errors.push({
      field: "sections",
      message: "At least one section is required",
    });
    return errors;
  }

  let totalQuestions = 0;

  exam.sections.forEach((section, sectionIndex) => {
    if (!section.section_id?.trim()) {
      errors.push({
        field: `sections[${sectionIndex}].section_id`,
        message: "Section ID is required",
        path: `Section ${sectionIndex + 1}`,
      });
    }

    if (!section.section_name?.trim()) {
      errors.push({
        field: `sections[${sectionIndex}].section_name`,
        message: "Section name is required",
        path: `Section ${sectionIndex + 1}`,
      });
    }

    if (!section.questions || section.questions.length === 0) {
      errors.push({
        field: `sections[${sectionIndex}].questions`,
        message: "Each section must have at least one question",
        path: `Section ${sectionIndex + 1}`,
      });
      return;
    }

    totalQuestions += section.questions.length;

    section.questions.forEach((question, questionIndex) => {
      if (!question.q_id?.trim()) {
        errors.push({
          field: `sections[${sectionIndex}].questions[${questionIndex}].q_id`,
          message: "Question ID is required",
          path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`,
        });
      }

      if (!question.text?.trim()) {
        errors.push({
          field: `sections[${sectionIndex}].questions[${questionIndex}].text`,
          message: "Question text is required",
          path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`,
        });
      }

      if (!question.options || question.options.length < 2) {
        errors.push({
          field: `sections[${sectionIndex}].questions[${questionIndex}].options`,
          message: "Each question must have at least 2 options",
          path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`,
        });
        return;
      }

      if (!question.correct_opt_id?.trim()) {
        errors.push({
          field: `sections[${sectionIndex}].questions[${questionIndex}].correct_opt_id`,
          message: "Correct option must be selected",
          path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`,
        });
      } else {
        const correctOptionExists = question.options.some(
          (opt) => opt.opt_id === question.correct_opt_id,
        );
        if (!correctOptionExists) {
          errors.push({
            field: `sections[${sectionIndex}].questions[${questionIndex}].correct_opt_id`,
            message: "Selected correct option does not exist",
            path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`,
          });
        }
      }

      question.options.forEach((option, optionIndex) => {
        if (!option.opt_id?.trim()) {
          errors.push({
            field: `sections[${sectionIndex}].questions[${questionIndex}].options[${optionIndex}].opt_id`,
            message: "Option ID is required",
            path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}, Option ${optionIndex + 1}`,
          });
        }

        if (!option.text?.trim()) {
          errors.push({
            field: `sections[${sectionIndex}].questions[${questionIndex}].options[${optionIndex}].text`,
            message: "Option text is required",
            path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}, Option ${optionIndex + 1}`,
          });
        }
      });

      const optionIds = question.options.map((opt) => opt.opt_id);
      const uniqueOptionIds = new Set(optionIds);
      if (uniqueOptionIds.size !== optionIds.length) {
        errors.push({
          field: `sections[${sectionIndex}].questions[${questionIndex}].options`,
          message: "Option IDs must be unique within a question",
          path: `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`,
        });
      }
    });

    const sectionIds = section.questions.map((q) => q.q_id);
    const uniqueSectionQIds = new Set(sectionIds);
    if (uniqueSectionQIds.size !== sectionIds.length) {
      errors.push({
        field: `sections[${sectionIndex}].questions`,
        message: "Question IDs must be unique within a section",
        path: `Section ${sectionIndex + 1}`,
      });
    }
  });

  if (totalQuestions !== exam.total_questions) {
    errors.push({
      field: "total_questions",
      message: `Total questions (${totalQuestions}) does not match expected count (${exam.total_questions})`,
    });
  }

  const sectionIds = exam.sections.map((s) => s.section_id);
  const uniqueSectionIds = new Set(sectionIds);
  if (uniqueSectionIds.size !== sectionIds.length) {
    errors.push({
      field: "sections",
      message: "Section IDs must be unique",
    });
  }

  return errors;
};

export const validateExamBuilder = (
  exam: ExamBuilderInput,
): ValidationResult => {
  const errors: ValidationError[] = [];

  errors.push(...validateExamBasics(exam));
  errors.push(...validateDuration(exam));
  errors.push(...validateMarking(exam));
  errors.push(...validateMarks(exam));
  errors.push(...validateQuestions(exam));
  errors.push(...validateSections(exam));

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateExamStep = (
  exam: ExamBuilderInput,
  step: number,
): ValidationResult => {
  const errors: ValidationError[] = [];

  if (step === 0) {
    errors.push(...validateExamBasics(exam));
  } else if (step === 1) {
    errors.push(...validateDuration(exam));
    errors.push(...validateMarking(exam));
    errors.push(...validateMarks(exam));
    errors.push(...validateQuestions(exam));
  } else if (step === 2) {
    errors.push(...validateSections(exam));
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getErrorsByField = (
  errors: ValidationError[],
  field: string,
): ValidationError[] => {
  return errors.filter((error) => error.field === field);
};

export const formatValidationError = (error: ValidationError): string => {
  if (error.path) {
    return `${error.path}: ${error.message}`;
  }
  return error.message;
};
