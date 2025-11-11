import { create } from "zustand";
import { Exam, OptionItem, TestTypeCount } from "@/types";
import { FILTER_OPTIONS } from "@/constants/filters";
import {
  normalizeTests,
  getExamNames,
  getTopics,
  getSubjects,
  calculateTabCounts,
} from "@/services/examService";
import {
  filterExams,
  hasActiveFilters,
  ExamFilters,
} from "@/services/filterService";

const { STRENGTHS, ATTEMPT_STATUSES } = FILTER_OPTIONS;

interface ExamSelectionState {
  activeTab: string;
  searchTerm: string;
  selectedExam: string;
  selectedTopic: string;
  selectedSubject: string;
  selectedStrength: string;
  selectedAttemptStatus: string;
  sortOrder: string;
  showMobileFilters: boolean;
  allTests: Exam[];
  examNames: string[];
  topics: string[];
  subjects: string[];
  tabCounts: TestTypeCount[];
  STRENGTHS: OptionItem[];
  ATTEMPT_STATUSES: OptionItem[];
  setAllTests: (exams: Exam[]) => void;
  setActiveTab: (activeTab: string) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSelectedExam: (selectedExam: string) => void;
  setSelectedTopic: (selectedTopic: string) => void;
  setSelectedSubject: (selectedSubject: string) => void;
  setSelectedStrength: (selectedStrength: string) => void;
  setSelectedAttemptStatus: (selectedAttemptStatus: string) => void;
  setSortOrder: (sortOrder: string) => void;
  toggleMobileFilters: () => void;
  clearAllFilters: () => void;
  filterTests: (attemptedExams?: Set<string>) => Exam[];
  hasActiveFilters: () => boolean;
}

export const examSelectionStore = create<ExamSelectionState>((set, get) => ({
  activeTab: "all",
  searchTerm: "",
  selectedExam: "All Exams",
  selectedTopic: "All Topics",
  selectedSubject: "All Subjects",
  selectedStrength: "All levels",
  selectedAttemptStatus: "all",
  sortOrder: "default",
  showMobileFilters: false,
  allTests: [],
  examNames: [],
  topics: [],
  subjects: [],
  tabCounts: [],
  STRENGTHS: [...STRENGTHS],
  ATTEMPT_STATUSES: [...ATTEMPT_STATUSES],

  setAllTests: (exams) => {
    const allTests = normalizeTests(exams);
    const examNames = getExamNames(allTests);
    const topics = getTopics(allTests);
    const subjects = getSubjects(allTests);
    const tabCounts = calculateTabCounts(allTests);
    set({ allTests, examNames, topics, subjects, tabCounts });
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedExam: (selectedExam) => set({ selectedExam }),
  setSelectedTopic: (selectedTopic) => set({ selectedTopic }),
  setSelectedSubject: (selectedSubject) => set({ selectedSubject }),
  setSelectedStrength: (selectedStrength) => set({ selectedStrength }),
  setSelectedAttemptStatus: (selectedAttemptStatus) =>
    set({ selectedAttemptStatus }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  toggleMobileFilters: () =>
    set((state) => ({ showMobileFilters: !state.showMobileFilters })),
  clearAllFilters: () =>
    set({
      searchTerm: "",
      selectedExam: "All Exams",
      selectedTopic: "All Topics",
      selectedSubject: "All Subjects",
      selectedStrength: "All levels",
      selectedAttemptStatus: "all",
      showMobileFilters: false,
    }),
  filterTests: (attemptedExams = new Set()) => {
    const {
      allTests,
      activeTab,
      searchTerm,
      selectedExam,
      selectedTopic,
      selectedSubject,
      selectedStrength,
      selectedAttemptStatus,
    } = get();

    const filters: ExamFilters = {
      activeTab,
      searchTerm,
      selectedExam,
      selectedTopic,
      selectedSubject,
      selectedStrength,
      selectedAttemptStatus,
    };

    return filterExams(allTests, filters, attemptedExams);
  },
  hasActiveFilters: () => {
    const {
      searchTerm,
      selectedExam,
      selectedTopic,
      selectedSubject,
      selectedStrength,
      selectedAttemptStatus,
    } = get();

    const filters: ExamFilters = {
      searchTerm,
      selectedExam,
      selectedTopic,
      selectedSubject,
      selectedStrength,
      selectedAttemptStatus,
    };

    return hasActiveFilters(filters);
  },
}));
