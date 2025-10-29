import { useEffect, useRef } from 'react'
import {
  KEYBOARD_SHORTCUTS,
  isKeyInShortcuts,
  getOptionIndexFromKey,
} from '@/constants'

const isEditableField = (target) => {
  if (!target) return true

  const tagName = target.tagName || ''
  const type = target.type || ''
  const isContentEditable = target.isContentEditable || false
  const isInputField = tagName === 'INPUT' && type !== 'radio'
  const isTextarea = tagName === 'TEXTAREA'

  return isContentEditable || isInputField || isTextarea
}

export const useKeyboardShortcuts = ({
  onPrevQuestion,
  onNextQuestion,
  onSelectOption,
  onMarkForReview,
  onToggleFullscreen,
  enabled = true,
}) => {
  const handlers = useRef({
    onPrevQuestion,
    onNextQuestion,
    onSelectOption,
    onMarkForReview,
    onToggleFullscreen,
  })

  useEffect(() => {
    handlers.current = {
      onPrevQuestion,
      onNextQuestion,
      onSelectOption,
      onMarkForReview,
      onToggleFullscreen,
    }
  }, [
    onPrevQuestion,
    onNextQuestion,
    onSelectOption,
    onMarkForReview,
    onToggleFullscreen,
  ])

  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (e) => {
      const target = e.target
      if (isEditableField(target)) return

      const { key } = e
      const isRadioTarget =
        target?.tagName === 'INPUT' && target?.type === 'radio'

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.PREV_QUESTION)) {
        if (isRadioTarget) e.preventDefault()
        if (!e.shiftKey) {
          handlers.current.onPrevQuestion?.()
        }
        return
      }

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.NEXT_QUESTION)) {
        if (isRadioTarget) e.preventDefault()
        if (!e.shiftKey) {
          handlers.current.onNextQuestion?.()
        }
        return
      }

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.MARK_REVIEW)) {
        handlers.current.onMarkForReview?.()
        return
      }

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.TOGGLE_FULLSCREEN)) {
        handlers.current.onToggleFullscreen?.()
        return
      }

      const optionIndex = getOptionIndexFromKey(key)
      if (optionIndex !== null) {
        handlers.current.onSelectOption?.(optionIndex)
        return
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [enabled])

  return {
    shortcuts: KEYBOARD_SHORTCUTS,
  }
}

export { KEYBOARD_SHORTCUTS }
