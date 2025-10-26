import { useEffect, useCallback } from 'react'
import {
  KEYBOARD_SHORTCUTS,
  isKeyInShortcuts,
  getOptionIndexFromKey,
} from '@/utils/constants/keyboardShortcuts'

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
  const handleKeyPress = useCallback(
    (e) => {
      if (!enabled) return

      const target = e.target
      if (isEditableField(target)) return

      const { key } = e
      const isRadioTarget =
        target?.tagName === 'INPUT' && target?.type === 'radio'

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.PREV_QUESTION)) {
        if (isRadioTarget) e.preventDefault()
        if (!e.shiftKey) {
          onPrevQuestion?.()
        }
        return
      }

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.NEXT_QUESTION)) {
        if (isRadioTarget) e.preventDefault()
        if (!e.shiftKey) {
          onNextQuestion?.()
        }
        return
      }

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.MARK_REVIEW)) {
        onMarkForReview?.()
        return
      }

      if (isKeyInShortcuts(key, KEYBOARD_SHORTCUTS.TOGGLE_FULLSCREEN)) {
        onToggleFullscreen?.()
        return
      }

      const optionIndex = getOptionIndexFromKey(key)
      if (optionIndex !== null) {
        onSelectOption?.(optionIndex)
        return
      }
    },
    [
      enabled,
      onPrevQuestion,
      onNextQuestion,
      onSelectOption,
      onMarkForReview,
      onToggleFullscreen,
    ]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress, enabled])

  return {
    shortcuts: KEYBOARD_SHORTCUTS,
  }
}

export { KEYBOARD_SHORTCUTS }
