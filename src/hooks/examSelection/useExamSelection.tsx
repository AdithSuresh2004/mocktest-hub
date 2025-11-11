import { useEffect } from "react";
import { examListStore } from "@/stores/examListStore";
import { attemptStore } from "@/stores/attemptStore";
import { examSelectionStore } from "@/stores/examSelectionStore";
import { sortTests } from "@/services/examService";

const useExamSelection = () => {
  const { exams, loadExams, loading } = examListStore();
  const { attempts } = attemptStore();
  const {
    setAllTests,
    filterTests,
    sortOrder,
    setSelectedExam,
    setSelectedTopic,
    setSelectedSubject,
    setSelectedStrength,
    setSelectedAttemptStatus,
    ...selectionState
  } = examSelectionStore();

  useEffect(() => {
    if (!exams.length) {
      loadExams();
    }
  }, [exams, loadExams]);

  useEffect(() => {
    setAllTests(exams);
  }, [exams, setAllTests]);

  const attemptedExams = new Set(Object.values(attempts).map((a) => a.exam_id));

  const filteredTests = filterTests(attemptedExams);

  const sortedTests = sortTests(filteredTests, sortOrder);

  const handleFilterChange = (filter: string, value: string | number) => {
    const stringValue = String(value);
    const action: Record<string, (value: string) => void> = {
      Exam: setSelectedExam,
      Topic: setSelectedTopic,
      Subject: setSelectedSubject,
      Strength: setSelectedStrength,
      "Attempt Status": setSelectedAttemptStatus,
    };

    const selectedAction = action[filter];
    if (selectedAction) selectedAction(stringValue);
  };

  return {
    loading,
    filteredTests: sortedTests,
    handleFilterChange,
    ...selectionState,
  };
};

export { useExamSelection };
