export const shimmer = 'animate-shimmer';

export const getExamAnimations = (isLandscape) => ({
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transformDelay: isLandscape ? '150ms' : '0ms',
})
