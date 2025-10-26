import { useState, useCallback } from 'react'

/**
 * Custom hook to manage modal state
 * @returns {Object} Modal state and handlers
 */
export const useModalState = () => {
  const [showExitModal, setShowExitModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  
  const handleExit = useCallback(() => {
    setShowExitModal(true)
  }, [])
  
  const cancelExit = useCallback(() => {
    setShowExitModal(false)
  }, [])
  
  const handleSubmit = useCallback(() => {
    setShowSubmitModal(true)
  }, [])
  
  const cancelSubmit = useCallback(() => {
    setShowSubmitModal(false)
  }, [])
  
  return {
    showExitModal,
    showSubmitModal,
    handleExit,
    cancelExit,
    handleSubmit,
    cancelSubmit,
  }
}

