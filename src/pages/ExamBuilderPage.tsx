import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamBuilderStore } from "@/stores/examBuilderStore";
import { examListStore } from "@/stores/examListStore";
import { useToast } from "@/stores/toastStore";
import { Exam } from "@/types";
import {
  ExamBasicsStep,
  ExamSettingsStep,
} from "@/components/examBuilder/ExamSteps";
import { SectionEditor } from "@/components/examBuilder/SectionEditor";
import { ValidationDisplay } from "@/components/examBuilder/ValidationDisplay";
import { StepNavigation } from "@/components/examBuilder/StepNavigation";
import {
  validateExamBuilder,
  validateExamStep,
} from "@/utils/validation/examBuilderValidator";
import { MdAdd, MdDownload, MdUpload, MdSave } from "react-icons/md";

const STEPS = [
  {
    id: 0,
    title: "Exam Basics",
    description: "Create exam identity and basic information",
  },
  {
    id: 1,
    title: "Exam Settings",
    description: "Configure duration, marks, and marking scheme",
  },
  {
    id: 2,
    title: "Content",
    description: "Add sections and questions",
  },
];

export const ExamBuilderPage = () => {
  const navigate = useNavigate();
  const { addCustomExam } = examListStore();
  const { addToast } = useToast();
  const {
    exam,
    currentStep,
    activeSection,
    isDirty,
    isSubmitting,
    validationErrors,
    setCurrentStep,
    setActiveSection,
    setValidationErrors,
    addSection,
    saveToLocalStorage,
    loadFromLocalStorage,
    exportExam,
    importExam,
    reset,
  } = useExamBuilderStore();

  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (!loadFromLocalStorage()) {
      addToast({
        type: "error",
        message: "Failed to load saved data from your browser.",
        duration: 3000,
      });
    }
  }, [loadFromLocalStorage, addToast]);

  useEffect(() => {
    if (exam.sections.length === 0) {
      addSection();
    }
  }, []);

  const handleNext = () => {
    const { errors } = validateExamStep(exam, currentStep);
    setValidationErrors(errors);

    if (errors.length === 0) {
      setCurrentStep(Math.min(currentStep + 1, STEPS.length - 1));
      setShowValidation(false);
    } else {
      setShowValidation(true);
    }
  };

  const handlePrev = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    setShowValidation(false);
  };

  const handleSubmit = async () => {
    const validation = validateExamBuilder(exam);
    setValidationErrors(validation.errors);

    if (validation.isValid) {
      try {
        const examToSave = {
          ...exam,
          is_custom: true,
          total_questions: exam.sections.reduce(
            (sum, section) => sum + section.questions.length,
            0,
          ),
        } as Exam;

        if (!examToSave.exam_id || !examToSave.exam_name) {
          throw new Error("Exam ID and name are required");
        }

        if (
          !Array.isArray(examToSave.sections) ||
          examToSave.sections.length === 0
        ) {
          throw new Error("At least one section is required");
        }

        addCustomExam(examToSave);
        if (reset()) {
          addToast({
            type: "success",
            message: `Exam "${exam.exam_name}" created successfully!`,
            duration: 3000,
          });
        } else {
          addToast({
            type: "error",
            message: "Failed to reset the form. Please refresh the page.",
            duration: 4000,
          });
        }
        setTimeout(() => {
          navigate("/exams");
        }, 500);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        addToast({
          type: "error",
          message: `Failed to create exam: ${errorMessage}`,
          duration: 4000,
        });
      }
    } else {
      setShowValidation(true);
    }
  };

  const handleSaveProgress = () => {
    if (saveToLocalStorage()) {
      addToast({
        type: "success",
        message: "Exam data saved to your browser.",
        duration: 3000,
      });
    } else {
      addToast({
        type: "error",
        message: "Failed to save exam data.",
        duration: 3000,
      });
    }
  };

  const handleExportExam = () => {
    const examJson = exportExam();
    const dataStr = examJson;
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${exam.exam_id}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImportExam = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const jsonString = event.target?.result as string;
          if (importExam(jsonString)) {
            addToast({
              type: "success",
              message: "Exam imported successfully!",
              duration: 3000,
            });
            setShowValidation(false);
          } else {
            addToast({
              type: "error",
              message:
                "Failed to import exam. Please check the file and the validation errors.",
              duration: 4000,
            });
            setShowValidation(true);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const currentStepData = STEPS[currentStep];

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Exam Builder
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and manage your own mock exams with complete validation
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSaveProgress}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            <MdSave size={18} />
            Save Progress
          </button>
          <button
            onClick={handleExportExam}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <MdDownload size={18} />
            Export
          </button>
          <button
            onClick={handleImportExam}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <MdUpload size={18} />
            Import
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStepData.title}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {currentStepData.description}
            </p>
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {currentStep + 1} of {STEPS.length}
          </div>
        </div>

        {showValidation && validationErrors.length > 0 && (
          <div className="mb-6">
            <ValidationDisplay errors={validationErrors} isValid={false} />
          </div>
        )}

        <div className="space-y-6">
          {currentStep === 0 && <ExamBasicsStep errors={validationErrors} />}

          {currentStep === 1 && <ExamSettingsStep errors={validationErrors} />}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Sections
                </h3>
                <button
                  onClick={addSection}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 dark:hover:bg-green-500"
                >
                  <MdAdd size={18} />
                  Add Section
                </button>
              </div>

              <div className="space-y-4">
                {exam.sections.map((_, sectionIndex) => (
                  <SectionEditor
                    key={sectionIndex}
                    sectionIndex={sectionIndex}
                    isActive={activeSection === sectionIndex}
                    onActivate={() => setActiveSection(sectionIndex)}
                    errors={validationErrors}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <StepNavigation
            currentStep={currentStep}
            totalSteps={STEPS.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            isValidating={isSubmitting}
            canProceed={validationErrors.length === 0 || currentStep !== 2}
          />
        </div>
      </div>

      {isDirty && (
        <div className="fixed right-4 bottom-4 rounded-lg bg-yellow-50 p-4 shadow-lg dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            You have unsaved changes
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamBuilderPage;
