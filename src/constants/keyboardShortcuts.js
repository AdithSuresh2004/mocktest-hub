export const KEYBOARD_SHORTCUTS = {
  PREV_QUESTION: ['ArrowLeft', '←'],
  NEXT_QUESTION: ['ArrowRight', '→'],
  SELECT_OPTION_1: '1',
  SELECT_OPTION_2: '2',
  SELECT_OPTION_3: '3',
  SELECT_OPTION_4: '4',
  MARK_REVIEW: ['m', 'M'],
  TOGGLE_FULLSCREEN: ['f', 'F'],
  ESCAPE: 'Escape',
}

export const isKeyInShortcuts = (key, shortcuts) => {
  return shortcuts.includes(key)
}

export const getOptionIndexFromKey = (key) => {
  const optionKeys = ['1', '2', '3', '4']
  if (optionKeys.includes(key)) {
    return parseInt(key) - 1
  }
  return null
}