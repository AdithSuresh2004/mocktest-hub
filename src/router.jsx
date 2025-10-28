import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import DashboardPage from '@/pages/DashboardPage'
import ExamSelectionPage from '@/pages/ExamSelectionPage'
import ExamPage from '@/pages/ExamPage'
import ErrorPage from '@/pages/ErrorPage'
import ResultPage from '@/pages/ResultPage'
import FavoritesPage from '@/pages/FavoritesPage'
import AttemptsPage from '@/pages/AttemptsPage'
import SettingsPage from '@/pages/SettingsPage'
import PendingTestsPage from '@/pages/PendingTestsPage'
import ReviewPage from '@/pages/ReviewPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'exams', element: <ExamSelectionPage /> },
      { path: 'pending', element: <PendingTestsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'attempts', element: <AttemptsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '/exam/:examId',
    element: <ExamPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/result/:attemptId',
    element: <ResultPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/review/:attemptId',
    element: <ReviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router