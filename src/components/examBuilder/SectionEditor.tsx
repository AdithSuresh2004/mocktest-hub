import {
  TextInput,
  TextArea,
  SelectInput,
} from "@/components/examBuilder/FormInputs";
import { useExamBuilderStore } from "@/stores/examBuilderStore";
import { ValidationError } from "@/types/examBuilder";
import { getErrorsByField } from "@/utils/validation/examBuilderValidator";
import { MdDelete, MdAdd } from "react-icons/md";
import { cn } from "@/utils/cn";

interface QuestionEditorProps {
  sectionIndex: number;
  questionIndex: number;
  errors: ValidationError[];
}

export const QuestionEditor = ({
  sectionIndex,
  questionIndex,
  errors,
}: QuestionEditorProps) => {
  const {
    exam,
    updateQuestion,
    updateOption,
    addOption,
    removeOption,
    removeQuestion,
  } = useExamBuilderStore();

  const section = exam.sections[sectionIndex];
  const question = section.questions[questionIndex];

  const getFieldError = (field: string): string | undefined => {
    const fieldErrors = getErrorsByField(errors, field);
    return fieldErrors.length > 0 ? fieldErrors[0].message : undefined;
  };

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Question {questionIndex + 1}
        </h4>
        <button
          onClick={() => removeQuestion(sectionIndex, questionIndex)}
          className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <MdDelete size={20} />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextInput
          label="Question ID"
          value={question.q_id}
          onChange={(value) =>
            updateQuestion(sectionIndex, questionIndex, { q_id: value })
          }
          error={getFieldError(
            `sections[${sectionIndex}].questions[${questionIndex}].q_id`,
          )}
          placeholder="e.g., Q1"
          required
        />
        <SelectInput
          label="Difficulty"
          value={question.difficulty || "medium"}
          onChange={(value) =>
            updateQuestion(sectionIndex, questionIndex, {
              difficulty: value as any,
            })
          }
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
        />
      </div>

      <TextArea
        label="Question Text"
        value={question.text}
        onChange={(value) =>
          updateQuestion(sectionIndex, questionIndex, { text: value })
        }
        error={getFieldError(
          `sections[${sectionIndex}].questions[${questionIndex}].text`,
        )}
        placeholder="Enter question text (supports LaTeX math with $ and $$)"
        rows={4}
        required
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-gray-900 dark:text-gray-100">
            Options
          </h5>
          <button
            onClick={() => addOption(sectionIndex, questionIndex)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            <MdAdd size={18} />
            Add Option
          </button>
        </div>

        <div className="space-y-4">
          {question.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                question.correct_opt_id === option.opt_id
                  ? "border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900",
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct_option_${questionIndex}`}
                    checked={question.correct_opt_id === option.opt_id}
                    onChange={() =>
                      updateQuestion(sectionIndex, questionIndex, {
                        correct_opt_id: option.opt_id,
                      })
                    }
                    className="h-4 w-4 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mark as Correct
                  </span>
                </label>
                {question.options.length > 2 && (
                  <button
                    onClick={() =>
                      removeOption(sectionIndex, questionIndex, optionIndex)
                    }
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <MdDelete size={18} />
                  </button>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <TextInput
                  label="Option ID"
                  value={option.opt_id}
                  onChange={(value) =>
                    updateOption(sectionIndex, questionIndex, optionIndex, {
                      opt_id: value,
                    })
                  }
                  placeholder="e.g., 1, A, or option_1"
                />
                <TextArea
                  label="Option Text"
                  value={option.text}
                  onChange={(value) =>
                    updateOption(sectionIndex, questionIndex, optionIndex, {
                      text: value,
                    })
                  }
                  placeholder="Enter option text (supports LaTeX math)"
                  rows={2}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <TextArea
        label="Explanation (Optional)"
        value={question.explanation || ""}
        onChange={(value) =>
          updateQuestion(sectionIndex, questionIndex, { explanation: value })
        }
        placeholder="Enter explanation for this question"
        rows={3}
      />
    </div>
  );
};

interface SectionEditorProps {
  sectionIndex: number;
  isActive: boolean;
  onActivate: () => void;
  errors: ValidationError[];
}

export const SectionEditor = ({
  sectionIndex,
  isActive,
  onActivate,
  errors,
}: SectionEditorProps) => {
  const { exam, updateSection, addQuestion, removeSection } =
    useExamBuilderStore();
  const section = exam.sections[sectionIndex];

  const getFieldError = (field: string): string | undefined => {
    const fieldErrors = getErrorsByField(errors, field);
    return fieldErrors.length > 0 ? fieldErrors[0].message : undefined;
  };

  return (
    <div className="space-y-4">
      <div
        onClick={onActivate}
        className={cn(
          "cursor-pointer rounded-lg border-2 p-4 transition-all",
          isActive
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
            : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600",
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {section.section_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {section.questions.length} questions
            </p>
          </div>
          {exam.sections.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSection(sectionIndex);
              }}
              className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <MdDelete size={20} />
            </button>
          )}
        </div>
      </div>

      {isActive && (
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 md:grid-cols-2">
            <TextInput
              label="Section ID"
              value={section.section_id}
              onChange={(value) =>
                updateSection(sectionIndex, { section_id: value })
              }
              error={getFieldError(`sections[${sectionIndex}].section_id`)}
              placeholder="e.g., section_1"
              required
            />
            <TextInput
              label="Section Name"
              value={section.section_name}
              onChange={(value) =>
                updateSection(sectionIndex, { section_name: value })
              }
              error={getFieldError(`sections[${sectionIndex}].section_name`)}
              placeholder="e.g., Mathematics"
              required
            />
          </div>

          <TextArea
            label="Section Instructions (Optional)"
            value={section.instructions || ""}
            onChange={(value) =>
              updateSection(sectionIndex, { instructions: value })
            }
            placeholder="Enter any section-specific instructions"
            rows={3}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Questions
              </h4>
              <button
                onClick={() => addQuestion(sectionIndex)}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 dark:hover:bg-green-500"
              >
                <MdAdd size={18} />
                Add Question
              </button>
            </div>

            <div className="space-y-6">
              {section.questions.map((_, questionIndex) => (
                <QuestionEditor
                  key={questionIndex}
                  sectionIndex={sectionIndex}
                  questionIndex={questionIndex}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
