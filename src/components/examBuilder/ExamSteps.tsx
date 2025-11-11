import {
  TextInput,
  NumberInput,
  SelectInput,
  TextArea,
} from "@/components/examBuilder/FormInputs";
import { useExamBuilderStore } from "@/stores/examBuilderStore";
import { ValidationError } from "@/types/examBuilder";
import { getErrorsByField } from "@/utils/validation/examBuilderValidator";

interface ExamBasicsStepProps {
  errors: ValidationError[];
}

export const ExamBasicsStep = ({ errors }: ExamBasicsStepProps) => {
  const { exam, updateExamField } = useExamBuilderStore();

  const getFieldError = (field: string): string | undefined => {
    const fieldErrors = getErrorsByField(errors, field);
    return fieldErrors.length > 0 ? fieldErrors[0].message : undefined;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <TextInput
          label="Exam ID"
          value={exam.exam_id}
          onChange={(value) => updateExamField("exam_id", value)}
          error={getFieldError("exam_id")}
          placeholder="e.g., nimcet_mock_1"
          required
        />
        <TextInput
          label="Exam Name"
          value={exam.exam_name}
          onChange={(value) => updateExamField("exam_name", value)}
          error={getFieldError("exam_name")}
          placeholder="e.g., NIMCET Mock Test 1"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <SelectInput
          label="Exam Type"
          value={exam.type}
          onChange={(value) => updateExamField("type", value as any)}
          options={[
            { value: "full_tests", label: "Full Tests" },
            { value: "subject_tests", label: "Subject Tests" },
            { value: "topic_tests", label: "Topic Tests" },
          ]}
          error={getFieldError("type")}
          required
        />
        <TextInput
          label="Category"
          value={exam.category}
          onChange={(value) => updateExamField("category", value)}
          error={getFieldError("category")}
          placeholder="e.g., NIMCET"
          required
        />
        <SelectInput
          label="Difficulty"
          value={exam.difficulty}
          onChange={(value) => updateExamField("difficulty", value as any)}
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          error={getFieldError("difficulty")}
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextInput
          label="Subject (Optional)"
          value={exam.subject || ""}
          onChange={(value) => updateExamField("subject", value || undefined)}
          placeholder="e.g., Mathematics"
        />
        <TextInput
          label="Topic (Optional)"
          value={exam.topic || ""}
          onChange={(value) => updateExamField("topic", value || undefined)}
          placeholder="e.g., Calculus"
        />
      </div>

      <TextArea
        label="General Instructions (Optional)"
        value={exam.instructions || ""}
        onChange={(value) =>
          updateExamField("instructions", value || undefined)
        }
        placeholder="Enter any general instructions for the exam..."
        rows={4}
      />
    </div>
  );
};

interface ExamSettingsStepProps {
  errors: ValidationError[];
}

export const ExamSettingsStep = ({ errors }: ExamSettingsStepProps) => {
  const { exam, updateExamField } = useExamBuilderStore();

  const getFieldError = (field: string): string | undefined => {
    const fieldErrors = getErrorsByField(errors, field);
    return fieldErrors.length > 0 ? fieldErrors[0].message : undefined;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <NumberInput
          label="Duration (minutes)"
          value={exam.duration_minutes}
          onChange={(value) => updateExamField("duration_minutes", value)}
          error={getFieldError("duration_minutes")}
          placeholder="e.g., 180"
          required
          min={1}
          max={480}
        />
        <NumberInput
          label="Total Questions"
          value={exam.total_questions}
          onChange={(value) => updateExamField("total_questions", value)}
          error={getFieldError("total_questions")}
          placeholder="e.g., 100"
          required
          min={1}
          max={1000}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <NumberInput
          label="Total Marks"
          value={exam.total_marks}
          onChange={(value) => updateExamField("total_marks", value)}
          error={getFieldError("total_marks")}
          placeholder="e.g., 400"
          required
          min={1}
          max={10000}
        />
      </div>

      <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Marking Scheme
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <NumberInput
            label="Marks for Correct Answer"
            value={exam.marking_scheme.correct_answer}
            onChange={(value) =>
              updateExamField("marking_scheme.correct_answer", value)
            }
            error={getFieldError("marking_scheme.correct_answer")}
            required
          />
          <NumberInput
            label="Marks for Incorrect Answer"
            value={exam.marking_scheme.incorrect_answer}
            onChange={(value) =>
              updateExamField("marking_scheme.incorrect_answer", value)
            }
            error={getFieldError("marking_scheme.incorrect_answer")}
            placeholder="Usually negative"
            required
          />
          <NumberInput
            label="Marks for Unattempted"
            value={exam.marking_scheme.unattempted}
            onChange={(value) =>
              updateExamField("marking_scheme.unattempted", value)
            }
            error={getFieldError("marking_scheme.unattempted")}
            required
          />
        </div>
      </div>
    </div>
  );
};
