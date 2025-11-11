import { useEffect, useRef } from "react";

import type { MutableRefObject } from "react";

export const useExamExitHandler = (
  saveAndExitExam: () => void,
  deleteAndExitExam: () => void,
  exitType: MutableRefObject<"save" | "delete" | null>,
) => {
  const saveAndExitExamRef = useRef(saveAndExitExam);
  const deleteAndExitExamRef = useRef(deleteAndExitExam);

  useEffect(() => {
    saveAndExitExamRef.current = saveAndExitExam;
    deleteAndExitExamRef.current = deleteAndExitExam;
  });

  useEffect(() => {
    return () => {
      if (exitType.current === "save") {
        saveAndExitExamRef.current();
      } else if (exitType.current === "delete") {
        deleteAndExitExamRef.current();
      }
    };
  }, [exitType]);
};
