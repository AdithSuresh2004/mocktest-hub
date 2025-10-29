import React from 'react';
import InstructionsPage from '@/pages/InstructionsPage';

const ExamInstructionsDisplay = ({ shouldShowInstructions, exam, onStart }) => {
  if (shouldShowInstructions) {
    return <InstructionsPage exam={exam} onStart={onStart} />;
  }
  return null;
};

export default ExamInstructionsDisplay;
