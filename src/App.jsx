import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import StatusDisplay from '@/components/common/StatusDisplay'
import Layout from '@/components/layout/Layout'
import { ToastProvider } from '@/hooks/common/useToast'
import ToastContainer from '@/components/common/ToastContainer'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ExamSelectionPage = lazy(() => import('@/pages/ExamSelectionPage'))
const ExamPage = lazy(() => import('@/pages/ExamPage'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))
const ResultPage = lazy(() => import('@/pages/ResultPage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const AttemptsPage = lazy(() => import('@/pages/AttemptsPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const PendingTestsPage = lazy(() => import('@/pages/PendingTestsPage'))
const ReviewPage = lazy(() => import('@/pages/ReviewPage'))

const PageLoader = () => (
  <StatusDisplay type="loading" message="Loading page..." fullScreen />
)

// Wrapper to add error boundary to each route
const RouteWithErrorBoundary = ({ children }) => (
  <ErrorBoundary fallbackUI="inline">
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  </ErrorBoundary>
)

function App() {
  return (
    <ToastProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<RouteWithErrorBoundary><ErrorPage /></RouteWithErrorBoundary>} />
              <Route index element={<RouteWithErrorBoundary><DashboardPage /></RouteWithErrorBoundary>} />
              <Route path="/exams" element={<RouteWithErrorBoundary><ExamSelectionPage /></RouteWithErrorBoundary>} />
              <Route path="/pending" element={<RouteWithErrorBoundary><PendingTestsPage /></RouteWithErrorBoundary>} />
              <Route path="/favorites" element={<RouteWithErrorBoundary><FavoritesPage /></RouteWithErrorBoundary>} />
              <Route path="/attempts" element={<RouteWithErrorBoundary><AttemptsPage /></RouteWithErrorBoundary>} />
              <Route path="/settings" element={<RouteWithErrorBoundary><SettingsPage /></RouteWithErrorBoundary>} />
            </Route>
            <Route path="/exam/:examId" element={<RouteWithErrorBoundary><ExamPage /></RouteWithErrorBoundary>} />
            <Route path="/result/:attemptId" element={<RouteWithErrorBoundary><ResultPage /></RouteWithErrorBoundary>} />
            <Route path="/review/:attemptId" element={<RouteWithErrorBoundary><ReviewPage /></RouteWithErrorBoundary>} />
          </Routes>
        </ErrorBoundary>
        <ToastContainer />
      </Router>
    </ToastProvider>
  )
}

export default App
