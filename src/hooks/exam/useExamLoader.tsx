import { useEffect, useState, useRef } from "react";
import { examStore } from "@/stores/examStore";
import { examListStore } from "@/stores/examListStore";
import { attemptStore } from "@/stores/attemptStore";

const useExamLoader = (
  examId: string | undefined,
  finalizeExamRef: React.RefObject<((isTimeout?: boolean) => void) | null>,
) => {
  const [hookLoading, setHookLoading] = useState(true);
  const [hookError, setHookError] = useState<string | null>(null);
  const initializedRef = useRef<string | null>(null);

  const {
    exams,
    loading: examListLoading,
    getExam,
    loadExams,
  } = examListStore();
  const { attempts, addAttempt } = attemptStore();
  const { loadExam: loadExamIntoStore, startTimer } = examStore();

  useEffect(() => {
    if (!exams.length && !examListLoading) {
      void loadExams();
    }
  }, [exams.length, examListLoading, loadExams]);

  useEffect(() => {
    const run = async () => {
      if (!examId) {
        await Promise.resolve();
        setHookLoading(false);
        return;
      }
      if (examListLoading) {
        setHookLoading(true);
        return;
      }

      if (initializedRef.current === examId) {
        return;
      }

      initializedRef.current = examId;
      await Promise.resolve();
      setHookLoading(true);
      setHookError(null);

      const exam = getExam(examId);

      if (!exam) {
        setHookError("Exam not found");
        setHookLoading(false);
        return;
      }

      const attempt = Object.values(attempts).find(
        (a) => a.exam_id === examId && a.status === "in_progress",
      );

      if (attempt) {
        loadExamIntoStore(exam, attempt, () => {
          if (finalizeExamRef.current) {
            finalizeExamRef.current(true);
          }
        });

        if (attempt._hasStarted) {
          startTimer();
        }
      } else {
        loadExamIntoStore(exam, null, () => {
          if (finalizeExamRef.current) {
            finalizeExamRef.current(true);
          }
        });
      }

      await Promise.resolve();
      setHookLoading(false);
    };

    void run();
  }, [
    examId,
    examListLoading,
    getExam,
    attempts,
    addAttempt,
    loadExamIntoStore,
    startTimer,
    finalizeExamRef,
  ]);

  return { loading: hookLoading, error: hookError };
};

export default useExamLoader;
