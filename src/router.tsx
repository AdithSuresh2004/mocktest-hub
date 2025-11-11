import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "@/pages/ErrorPage";
import DashboardPage from "@/pages/DashboardPage";
import ExamSelectionPage from "@/pages/ExamSelectionPage";
import ExamPage from "@/pages/ExamPage";
import ResultPage from "@/pages/ResultPage";
import FavoritesPage from "@/pages/FavoritesPage";
import AttemptsPage from "@/pages/AttemptsPage";
import SettingsPage from "@/pages/SettingsPage";
import PendingTestsPage from "@/pages/PendingTestsPage";
import ReviewPage from "@/pages/ReviewPage";
import ExamBuilderPage from "@/pages/ExamBuilderPage";
import NotesPage from "@/pages/NotesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "exams", element: <ExamSelectionPage /> },
      { path: "builder", element: <ExamBuilderPage /> },
      { path: "pending", element: <PendingTestsPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "attempts", element: <AttemptsPage /> },
      { path: "notes", element: <NotesPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/exam/:examId",
    element: <ExamPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/result/:attemptId",
    element: <ResultPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/review/:attemptId",
    element: <ReviewPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
