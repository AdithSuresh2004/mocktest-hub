import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useExam from "@/hooks/exam/useExam";
import { useKeyboardShortcuts } from "@/hooks/exam/useKeyboardShortcuts";
import { useModalState } from "@/hooks/exam/useModalState";
import { useExamState } from "@/hooks/exam/useExamState";
import InstructionsPage from "@/pages/InstructionsPage";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ExamHeader from "@/components/exam/ExamHeader";
import QuestionArea from "@/components/exam/QuestionArea";
import QuestionNavigator from "@/components/exam/QuestionNavigator";
import ExamNavigation from "@/components/exam/ExamNavigation";
import ExitTestModal from "@/components/modals/ExitTestModal";
import SubmissionModal from "@/components/modals/SubmissionModal";
import StatusDisplay from "@/components/common/StatusDisplay";
import Button from "@/components/common/Button";

const ExamPage = () => {
	const { examId } = useParams();
	const navigate = useNavigate();
	const {
		exam,
		attempt,
		loading,
		error,
		isSubmitted,
		hasStarted,
		navigation,
		timer,
		handleAnswer: saveAnswer,
		toggleMarkForReview,
		finalizeExam,
		saveAndExitExam,
		deleteAndExitExam,
		answers,
		markedForReview,
		startExamTimer
	} = useExam(examId);

	const {
		currentSection,
		currentQuestion,
		navigateToQuestion,
		goToNext,
		goToPrev
	} = navigation;
	const { seconds: timeRemaining, stop, isWarning, isCritical } = timer;
	const [showInstructions, setShowInstructions] = useState(null); // null = undetermined, true/false = determined

	const modalState = useModalState();
	const {
		showExitModal,
		showSubmitModal,
		handleExit,
		cancelExit,
		handleSubmit,
		cancelSubmit
	} = modalState;

	// Initialize instruction visibility based on exam state to prevent flashing
	useEffect(() => {
		if (attempt !== undefined) {
			// Only run when attempt is actually loaded (not undefined)
			if (hasStarted || Object.keys(answers).length > 0) {
				// If exam has already started or has answers, hide instructions
				setShowInstructions(false);
			} else {
				// If exam hasn't started and has no answers, show instructions
				setShowInstructions(true);
			}
		}
	}, [attempt, answers, hasStarted]);

	const handleStartExam = () => {
		setShowInstructions(false);
		startExamTimer();
	};

	useEffect(() => {
		return () => {
			if (stop) stop();
		};
	}, [stop]);

	useEffect(() => {
		if (isSubmitted && attempt?.attempt_id) {
			setTimeout(() => navigate(`/result/${attempt.attempt_id}`), 500);
		}
	}, [isSubmitted, attempt?.attempt_id, navigate]);

	const confirmSubmit = () => {
		cancelSubmit();
		finalizeExam();
	};

	const saveAndExit = () => {
		navigate("/");
		saveAndExitExam();
		cancelExit();
	};

	const exitWithoutSaving = () => {
		navigate("/");
		deleteAndExitExam();
		cancelExit();
	};

	const {
		currentSectionObj,
		currentQ,
		totalQuestions,
		canGoPrev,
		canGoNext
	} = useExamState(exam, currentSection, currentQuestion);

	const handleSelectOption = (optionIndex) => {
		if (currentQ?.options[optionIndex]) {
			saveAnswer(currentQ.q_id, currentQ.options[optionIndex].opt_id);
		}
	};

	const handleToggleFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	};

	useKeyboardShortcuts({
		onPrevQuestion: canGoPrev ? goToPrev : null,
		onNextQuestion: canGoNext ? goToNext : null,
		onSelectOption: handleSelectOption,
		onMarkForReview: () => currentQ && toggleMarkForReview(currentQ.q_id),
		onToggleFullscreen: handleToggleFullscreen,
		enabled:
			showInstructions === false &&
			!loading &&
			!showExitModal &&
			!showSubmitModal
	});

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 p-4 sm:p-6 dark:bg-gray-900">
				<SkeletonLoader type="exam" count={1} />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-full flex-col items-center justify-center gap-4 p-4 text-center">
				<p className="text-lg text-red-600 sm:text-xl dark:text-red-400">
					{error}
				</p>
				<Button
					onClick={() => (window.location.href = "/")}
					variant="primary"
				>
					Back to Home
				</Button>
			</div>
		);
	}

	// Show loading state while determining initial state
	if (showInstructions === null) {
		return (
			<div className="min-h-screen bg-gray-100 p-4 sm:p-6 dark:bg-gray-900">
				<SkeletonLoader type="exam" count={1} />
			</div>
		);
	}

	if (
		showInstructions &&
		exam &&
		attempt &&
		Object.keys(answers).length === 0 &&
		!hasStarted
	) {
		return <InstructionsPage exam={exam} onStart={handleStartExam} />;
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

	if (!exam || !currentQ) {
		return (
			<StatusDisplay
				type="error"
				message="Exam data is incomplete or invalid."
				fullScreen
			/>
		);
	}

	return (
		<div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 transition-[background-color] duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
			<div className="flex-shrink-0 border-b border-blue-200 bg-white shadow-md backdrop-blur-sm transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm">
				<ExamHeader
					exam={exam}
					timeRemaining={timeRemaining}
					onExit={handleExit}
					isWarning={isWarning}
					isCritical={isCritical}
				/>
			</div>
			<div className="flex flex-1 overflow-hidden">
				<main className="flex-1 overflow-y-auto custom-scrollbar transition-colors duration-300">
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
				</main>
				<aside className="hidden w-full border-l border-gray-200 transition-colors duration-300 dark:border-gray-800 lg:block lg:w-72 xl:w-80">
					<div className="h-full overflow-y-auto custom-scrollbar">
						<QuestionNavigator
							sections={exam.sections}
							currentSectionIndex={currentSection}
							currentQuestionIndex={currentQuestion}
							answers={answers}
							markedForReview={markedForReview}
							onQuestionSelect={navigateToQuestion}
						/>
					</div>
				</aside>
			</div>
			<div className="flex-shrink-0 border-t border-blue-200 bg-white shadow-md backdrop-blur-sm transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm">
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
			</div>
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
