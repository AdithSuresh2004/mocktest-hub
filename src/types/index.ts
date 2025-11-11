export type TabId = "all" | "full_tests" | "subject_tests" | "topic_tests";
export interface Exam {
  exam_id: string;
  exam_name: string;
  type: string;
  category?: string;
  subject?: string;
  subjects?: string[];
  topic?: string;
  topics?: string[];
  difficulty?: string;
  duration_minutes: number;
  total_marks: number;
  total_questions: number;
  sections: Section[];
  exam_strength?: string;
  marking_scheme?: MarkingScheme;
  is_custom?: boolean;
}

export interface MarkingScheme {
  correct_answer?: number;
  incorrect_answer?: number;
  unattempted?: number;
}

export interface Section {
  section_id?: string;
  section_name: string;
  question_count?: number;
  instructions?: string;
  questions: Question[];
}

export interface Question {
  q_id: string;
  text: string;
  image?: string;
  options: Option[];
  correct_opt_id: string;
  difficulty?: string;
  marks?: number;
  negative_marks?: number;
  explanation?: string;
}

export interface Option {
  opt_id: string;
  text: string;
  image?: string;
}

export interface Attempt {
  id: string;
  exam_id: string;
  status: "in_progress" | "completed" | "paused";
  date: string;
  responses: Response[];
  score?: number | AttemptScore;
  time_taken?: number;
  _currentSection?: number;
  _currentQuestion?: number;
  _timeRemainingSeconds?: number;
  _markedForReview?: string[];
  _hasStarted?: boolean;
}

export interface AttemptScore {
  actual: number;
  total: number;
  per_section?: Record<string, number>;
}

export interface Response {
  q_id: string;
  selected_opt_id: string;
}

export interface Analysis {
  sectionAnalysis: SectionAnalysis[];
  overall: OverallStats;
  score: ScoreInfo;
  accuracy: AccuracyInfo;
  speed?: SpeedInfo;
}

export interface SectionAnalysis {
  sectionName: string;
  correct: number;
  incorrect: number;
  unanswered: number;
  totalQuestions: number;
  marksObtained: number;
  totalMarks: number;
  accuracy: number;
  stats: {
    correct: number;
    incorrect: number;
    unanswered: number;
  };
}

export interface OverallStats {
  correct: number;
  incorrect: number;
  unanswered: number;
  totalQuestions: number;
  attempted: number;
  accuracy: number;
  percentage: number;
}

export interface ScoreInfo {
  actual: number;
  total: number;
}

export interface AccuracyInfo {
  percentage: number;
}

export interface SpeedInfo {
  text: string;
  color: string;
}

export interface PerformanceLevel {
  text: string;
  color: string;
}

export interface AttemptStats {
  avgScore: number;
  bestScore: number;
  worstScore: number;
  avgTime: number;
  totalTime: number;
  count: number;
}

export interface AchievementBadge {
  icon: string;
  name: string;
  description: string;
}

export interface OptionItem {
  value: string;
  label: string;
}

export interface TestType {
  id: TabId;
  label: string;
}

export interface TestTypeCount extends TestType {
  count: number;
}

export interface EnrichedOverallStats extends OverallStats, PerformanceLevel {}
export interface EnrichedScoreInfo extends ScoreInfo, PerformanceLevel {}
export interface EnrichedAccuracyInfo extends AccuracyInfo, PerformanceLevel {}

export interface EnrichedAnalysis
  extends Omit<Analysis, "overall" | "score" | "accuracy"> {
  overall: EnrichedOverallStats;
  score: EnrichedScoreInfo;
  accuracy: EnrichedAccuracyInfo;
}

export interface DashboardStats {
  totalAttempts: number;
  pendingTests: number;
  completedTests: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
}

export interface StreakData {
  current: number;
  longest: number;
  today: number;
  week: number;
  month: number;
}

export interface Filters {
  activeTab: string;
  searchTerm: string;
  selectedExam: string;
  selectedTopic: string;
  selectedSubject: string;
  selectedStrength: string;
  selectedAttemptStatus: string;
  sortOrder: string;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface TimerState {
  seconds: number;
  formattedTime: string;
  isActive: boolean;
  isTimeUp: boolean;
  isWarning: boolean;
  isCritical: boolean;
}

export interface UIState {
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, string>;
  markedForReview: Set<string>;
}
