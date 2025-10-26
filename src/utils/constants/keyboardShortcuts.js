/**
 * Keyboard shortcut configuration
 */

export const KEYBOARD_SHORTCUTS = {
  // Navigation
  PREV_QUESTION: ['ArrowLeft', '←'],
  NEXT_QUESTION: ['ArrowRight', '→'],
  
  // Options selection
  SELECT_OPTION_1: '1',
  SELECT_OPTION_2: '2',
  SELECT_OPTION_3: '3',
  SELECT_OPTION_4: '4',
  
  // Actions
  MARK_REVIEW: ['m', 'M'],
  TOGGLE_FULLSCREEN: ['f', 'F'],
  ESCAPE: 'Escape',
}

/**
 * Check if a key is in the allowed keys array
 */
export const isKeyInShortcuts = (key, shortcuts) => {
  return shortcuts.includes(key)
}

/**
 * Get option index from keyboard input (1-4)
 */
export const getOptionIndexFromKey = (key) => {
  const optionKeys = ['1', '2', '3', '4']
  if (optionKeys.includes(key)) {
    return parseInt(key) - 1
  }
  return null
}

