export const FILTER_OPTIONS = {
  TEST_TYPES: [
    { id: "all", label: "All Tests" },
    { id: "full_tests", label: "Mock Tests" },
    { id: "subject_tests", label: "Subject Wise" },
    { id: "topic_tests", label: "Topic Wise" },
  ],
  STRENGTHS: [
    { value: "All levels", label: "All Levels" },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ],
  ATTEMPT_STATUSES: [
    { value: "all", label: "All Statuses" },
    { value: "attempted", label: "Attempted" },
    { value: "unattempted", label: "Unattempted" },
  ],
} as const;
