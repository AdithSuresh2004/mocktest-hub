import { useEffect } from "react";
import {
  KEYBOARD,
  isKeyInShortcuts,
  getOptionFromKey,
} from "@/constants/ui-config";

interface UseKeyboardShortcutsProps {
  onPrevQuestion?: (() => void) | null;
  onNextQuestion?: (() => void) | null;
  onSelectOption?: ((index: number) => void) | null;
  onMarkForReview?: (() => void) | null;
  onToggleFullscreen?: (() => void) | null;
  enabled: boolean;
}

export const useKeyboardShortcuts = ({
  onPrevQuestion,
  onNextQuestion,
  onSelectOption,
  onMarkForReview,
  onToggleFullscreen,
  enabled,
}: UseKeyboardShortcutsProps): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isKeyInShortcuts(e.key, KEYBOARD.PREV)) {
        onPrevQuestion?.();
      } else if (isKeyInShortcuts(e.key, KEYBOARD.NEXT)) {
        onNextQuestion?.();
      } else if (getOptionFromKey(e.key) !== null) {
        onSelectOption?.(getOptionFromKey(e.key)!);
      } else if (isKeyInShortcuts(e.key, KEYBOARD.MARK)) {
        onMarkForReview?.();
      } else if (isKeyInShortcuts(e.key, KEYBOARD.FULLSCREEN)) {
        onToggleFullscreen?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    enabled,
    onPrevQuestion,
    onNextQuestion,
    onSelectOption,
    onMarkForReview,
    onToggleFullscreen,
  ]);
};
