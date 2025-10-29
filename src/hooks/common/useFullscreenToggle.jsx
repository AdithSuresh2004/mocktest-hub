import { useCallback } from 'react';

export const useFullscreenToggle = () => {
  const handleToggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  return { handleToggleFullscreen };
};
