import { useState, useRef } from 'react';

export const useExamModals = ({ onConfirmSubmit, onSaveAndExit, onExitWithoutSaving }) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const exitType = useRef(null);

  const handleExit = () => setShowExitModal(true);
  const cancelExit = () => setShowExitModal(false);

  const handleSubmit = () => setShowSubmitModal(true);
  const cancelSubmit = () => setShowSubmitModal(false);

  const confirmSubmit = () => {
    cancelSubmit();
    onConfirmSubmit();
  };

  const handleSaveAndExit = () => {
    exitType.current = 'save';
    onSaveAndExit();
  };

  const handleExitWithoutSaving = () => {
    exitType.current = 'delete';
    onExitWithoutSaving();
  };

  return {
    showExitModal,
    showSubmitModal,
    exitType,
    handleExit,
    cancelExit,
    handleSubmit,
    cancelSubmit,
    confirmSubmit,
    handleSaveAndExit,
    handleExitWithoutSaving,
  };
};
