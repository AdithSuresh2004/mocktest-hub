import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatusDisplay from "@/components/ui/StatusDisplay";
import QuestionArea from "@/components/exam/QuestionArea";
import QuestionNavigator from "@/components/exam/QuestionNavigator";
import ExamNavigation from "@/components/exam/ExamNavigation";
import ExamHeader from "@/components/exam/ExamHeader";
import SubmissionModal from "@/components/modals/SubmissionModal";
import ExitTestModal from "@/components/modals/ExitTestModal";
import useExam from "@/hooks/useExam";
const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const {
    exam,
    attempt,
    answers,
    markedForReview,
    isSubmitted,
    currentSection,
    currentQuestion,
    timeRemaining,
    saveAnswer,
    saveAndExitExam,
    deleteAndExitExam,
    toggleMarkForReview,
    finalizeExam,
    navigateToQuestion,
    goToNext,
    goToPrev,
    error,
    loading,
    stop,
  } = useExam(examId);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  useEffect(() => {
    if (isSubmitted && attempt?.attempt_id) {
      setTimeout(() => navigate(`/results/${attempt.attempt_id}`), 1000);
    }
  }, [isSubmitted, attempt?.attempt_id, navigate]);
  const handleSubmit = () => setShowSubmitModal(true);
  const cancelSubmit = () => setShowSubmitModal(false);
  const confirmSubmit = () => {
    setShowSubmitModal(false);
    finalizeExam();
  };
  const handleExit = () => setShowExitModal(true);
  const cancelExit = () => setShowExitModal(false);
  const saveAndExit = () => {
    setShowExitModal(false);
    saveAndExitExam();
    navigate('/');
  };
  const exitWithoutSaving = () => {
    setShowExitModal(false);
    deleteAndExitExam();
    navigate('/');
  };
  const currentSectionObj = useMemo(() =>
    exam?.sections?.[currentSection] || { questions: [] },
    [exam?.sections, currentSection]
  );
  const currentQ = useMemo(() =>
    currentSectionObj.questions[currentQuestion] || null,
    [currentSectionObj.questions, currentQuestion]
  );
  const totalQuestions = useMemo(() =>
    exam?.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0,
    [exam?.sections]
  );
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && !e.shiftKey) {
        goToPrev();
      } else if (e.key === 'ArrowRight' && !e.shiftKey) {
        goToNext();
      } else if (e.key >= '1' && e.key <= '4' && currentQ) {
        const optionIndex = parseInt(e.key) - 1;
        if (currentQ.options[optionIndex]) {
          saveAnswer(currentQ.q_id, currentQ.options[optionIndex]);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMarkForReview(currentQ.q_id);
      } else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQ, goToPrev, goToNext, saveAnswer, toggleMarkForReview]);
  if (loading) {
    return <StatusDisplay type="loading" message="Loading exam..." fullScreen />;
  }
  if (error) {
    return <StatusDisplay type="error" message={error} fullScreen />;
  }
  if (!exam || !currentQ) {
    return <StatusDisplay type="error" message="Exam data is incomplete or invalid." fullScreen />;
  }
  if (isSubmitted) {
    return (
      <StatusDisplay
        type="loading"
        message="Submitting exam and preparing results..."
        fullScreen
      />
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <ExamHeader
        exam={exam}
        timeRemaining={timeRemaining}
        onExit={handleExit}
      />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <QuestionArea
          question={currentQ}
          section={currentSectionObj.section_name}
          questionIndex={currentQuestion}
          totalQuestions={currentSectionObj.questions.length}
          selected={answers[currentQ.q_id]}
          markedForReview={markedForReview}
          onAnswer={saveAnswer}
          onMarkForReview={toggleMarkForReview}
        />
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 flex-shrink-0">
          <QuestionNavigator
            sections={exam.sections}
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            answers={answers}
            markedForReview={markedForReview}
            onNavigate={navigateToQuestion}
          />
        </div>
      </div>
      <ExamNavigation
        canGoPrev={currentSection > 0 || currentQuestion > 0}
        canGoNext={
          currentSection < exam.sections.length - 1 ||
          currentQuestion < currentSectionObj.questions.length - 1
        }
        onPrev={goToPrev}
        onNext={goToNext}
        onSubmit={handleSubmit}
      />
      {showExitModal && (
        <ExitTestModal
          hasAnswers={Object.keys(answers).length > 0}
          onSaveAndExit={saveAndExit}
          onExitWithoutSaving={exitWithoutSaving}
          onCancel={cancelExit}
        />
      )}
      {showSubmitModal && (
        <SubmissionModal
          answeredCount={Object.keys(answers).length}
          totalQuestions={totalQuestions}
          onConfirm={confirmSubmit}
          onCancel={cancelSubmit}
        />
      )}
    </div>
  );
};
export default ExamPage;