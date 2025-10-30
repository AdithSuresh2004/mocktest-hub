
import { createContext, useContext, useState } from 'react';
import { useExamSelection } from '@/hooks/examSelection/useExamSelection';

const ExamSelectionContext = createContext();

export const ExamSelectionProvider = ({ children }) => {
  const examSelection = useExamSelection();

  return (
    <ExamSelectionContext.Provider value={examSelection}>
      {children}
    </ExamSelectionContext.Provider>
  );
};

export const useExamSelectionContext = () => {
  const context = useContext(ExamSelectionContext);
  if (!context) {
    throw new Error('useExamSelectionContext must be used within an ExamSelectionProvider');
  }
  return context;
};
