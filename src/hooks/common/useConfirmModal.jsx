import { useState } from 'react'

export function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'warning',
  })

  const openConfirm = ({ title, message, onConfirm, type = 'warning' }) => {
    setConfig({ title, message, onConfirm, type })
    setIsOpen(true)
  }

  const closeConfirm = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    config,
    openConfirm,
    closeConfirm,
  }
}
