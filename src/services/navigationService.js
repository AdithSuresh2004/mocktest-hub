import { useNavigate } from 'react-router-dom'

export const createNavigationHandlers = (navigate) => {
  return {
    navigateToHome: () => navigate('/'),
    navigateToExams: () => navigate('/exams'),
    navigateToResult: (attemptId) => navigate(`/result/${attemptId}`),
    navigateToReview: (attemptId) => navigate(`/review/${attemptId}`),
    navigateToExam: (examId) => navigate(`/exam/${examId}`),
    navigateToAttempts: () => navigate('/attempts'),
    navigateToSettings: () => navigate('/settings'),
    navigateToFavorites: () => navigate('/favorites'),
    navigateToPendingTests: () => navigate('/pending'),
    goBack: () => window.history.back(),
  }
}

