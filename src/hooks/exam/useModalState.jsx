import { useState } from 'react'

export const useModalState = () => {
  const [showExitModal, setShowExitModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const handleExit = () => {
    setShowExitModal(true)
  }

  const cancelExit = () => {
    setShowExitModal(false)
  }

  const handleSubmit = () => {
    setShowSubmitModal(true)
  }

  const cancelSubmit = () => {
    setShowSubmitModal(false)
  }

  return {
    showExitModal,
    showSubmitModal,
    handleExit,
    cancelExit,
    handleSubmit,
    cancelSubmit,
  }
}
