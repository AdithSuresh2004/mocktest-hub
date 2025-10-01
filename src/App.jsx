import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DashboardPage from "@/pages/DashboardPage";
import ExamSelectionPage from "@/pages/ExamSelectionPage";
import ExamPage from "@/pages/ExamPage";
import ErrorPage from "@/pages/ErrorPage";
import ResultPage from "@/pages/ResultPage";
import FavoritesPage from "@/pages/FavoritesPage";
import AttemptsPage from "@/pages/AttemptsPage";
import SettingsPage from "@/pages/SettingsPage";
import PendingTestsPage from "@/pages/PendingTestsPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<ErrorPage />} />
          <Route index element={<DashboardPage />} />
          <Route path="/exams" element={<ExamSelectionPage />} />
          <Route path="/pending" element={<PendingTestsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/attempts" element={<AttemptsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="/results/:attemptId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
export default App;
