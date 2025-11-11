import { useEffect, useRef } from "react";
import {
  KEYBOARD,
  isKeyInShortcuts,
  getOptionFromKey,
} from "@/constants/ui-config";

const isEditableField = (target: any) => {
  const tagName = target?.tagName || "";
  const isInput = tagName === "INPUT" && target.type !== "radio";
  return target?.isContentEditable || isInput || tagName === "TEXTAREA";
};

interface UseKeyboardShortcutsProps {
  onPrevQuestion?: () => void;
  onNextQuestion?: () => void;
  onSelectOption?: (index: number) => void;
  onMarkForReview?: () => void;
  onToggleFullscreen?: () => void;
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({
  onPrevQuestion,
  onNextQuestion,
  onSelectOption,
  onMarkForReview,
  onToggleFullscreen,
  enabled = true,
}: UseKeyboardShortcutsProps) => {
  const handlers = useRef({
    onPrevQuestion,
    onNextQuestion,
    onSelectOption,
    onMarkForReview,
    onToggleFullscreen,
  });

  useEffect(() => {
    handlers.current = {
      onPrevQuestion,
      onNextQuestion,
      onSelectOption,
      onMarkForReview,
      onToggleFullscreen,
    };
  }, [
    onPrevQuestion,
    onNextQuestion,
    onSelectOption,
    onMarkForReview,
    onToggleFullscreen,
  ]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (isEditableField(target)) return;

      const { key } = e;
      const isRadio =
        target?.tagName === "INPUT" &&
        (target as HTMLInputElement).type === "radio";

      if (isKeyInShortcuts(key, KEYBOARD.PREV)) {
        if (isRadio) e.preventDefault();
        if (!e.shiftKey) handlers.current.onPrevQuestion?.();
        return;
      }
      if (isKeyInShortcuts(key, KEYBOARD.NEXT)) {
        if (isRadio) e.preventDefault();
        if (!e.shiftKey) handlers.current.onNextQuestion?.();
        return;
      }
      if (isKeyInShortcuts(key, KEYBOARD.MARK)) {
        handlers.current.onMarkForReview?.();
        return;
      }
      if (isKeyInShortcuts(key, KEYBOARD.FULLSCREEN)) {
        handlers.current.onToggleFullscreen?.();
        return;
      }

      const idx = getOptionFromKey(key);
      if (idx !== null) {
        handlers.current.onSelectOption?.(idx);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enabled]);

  return { shortcuts: KEYBOARD };
};

export { KEYBOARD };
