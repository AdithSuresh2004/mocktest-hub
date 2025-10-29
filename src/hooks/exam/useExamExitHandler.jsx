import { useEffect, useRef } from 'react';

export const useExamExitHandler = (saveAndExitExam, deleteAndExitExam, exitType) => {
  const saveAndExitExamRef = useRef(saveAndExitExam);
  const deleteAndExitExamRef = useRef(deleteAndExitExam);

  useEffect(() => {
    saveAndExitExamRef.current = saveAndExitExam;
    deleteAndExitExamRef.current = deleteAndExitExam;
  });

  useEffect(() => {
    return () => {
      if (exitType.current === 'save') {
        saveAndExitExamRef.current();
      } else if (exitType.current === 'delete') {
        deleteAndExitExamRef.current();
      }
    };
  }, [exitType]);
};
