import type { Exam, Question, Section } from "@/types";
import type { IconType } from "react-icons";

export interface ExamLayoutProps {
  exam: Exam;
  timeRemaining: number;
  onExit: () => void;
  isWarning: boolean;
  isCritical: boolean;
  currentQ?: Question;
  currentSectionObj?: Section;
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, string>;
  markedForReview: Set<string>;
  saveAnswer: (questionId: string, optionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  goToPrev: () => void;
  goToNext: () => void;
  handleSubmit: () => void;
  navigateToQuestion: (sectionIndex: number, questionIndex: number) => void;
}

export interface QuestionAreaProps {
  question: Question;
  section: string;
  questionIndex: number;
  totalQuestions: number;
  selected: string | null;
  markedForReview: boolean | Set<string>;
  onAnswer: (questionId: string, optionId: string) => void;
  onMarkForReview: (questionId: string) => void;
  containerClass?: string;
}

export interface QuestionHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  sectionName: string;
  markedForReview: boolean;
  onMarkForReview: () => void;
}

export interface QuestionNavigatorProps {
  sections: Section[];
  answers: Record<string, string>;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  markedForReview: Set<string>;
  isReviewMode?: boolean;
}

export interface QuestionLegendProps {
  stats: {
    total: number;
    answered: number;
    marked: number;
    notVisited: number;
    incorrect?: number;
  };
  isReviewMode?: boolean;
}

export interface ExamStatusDisplayProps {
  loading: boolean;
  error: string | null;
  isSubmitted: boolean;
  exam: Exam | null;
  currentQ: Question | null;
}

export interface InstructionContentProps {
  exam: Exam;
}

export interface ExamDetailsSummaryProps {
  exam: Exam;
}

export interface MetricCardProps {
  Icon: IconType;
  label: string;
  value: string | number;
  color?: "blue" | "green" | "purple" | "yellow" | "red";
  variant?: "standard" | "compact" | "prominent";
}

export interface PerformanceSnapshotProps {
  stats: {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
    totalTimeSpent: number;
  };
}

export interface StatsGridProps {
  stats: {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
    totalTimeSpent: number;
  };
}

export interface ExamStatsProps {
  filteredTests: Exam[];
  allTests: Exam[];
}
