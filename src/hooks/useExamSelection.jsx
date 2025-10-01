import { useState, useEffect, useMemo, useCallback } from "react";
import { getExamsManifest } from "@/api/examApi";
const TEST_TYPES = [
  { id: "all", label: "All Tests" },
  { id: "full_tests", label: "Mock Tests" },
  { id: "subject_tests", label: "Subject Wise" },
  { id: "topic_tests", label: "Topic Wise" },
];
const STRENGTHS = [
  { value: "All levels", label: "All Levels" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];
export function useExamSelection() {
  const [manifest, setManifest] = useState({
    full_tests: [],
    subject_tests: [],
    topic_tests: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedStrength, setSelectedStrength] = useState("All levels");
  const loadManifest = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExamsManifest();
      setManifest(data);
    } catch (err) {
      setError(err.message || "Failed to load exams");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadManifest();
  }, [loadManifest]);
  const allTests = useMemo(
    () => [
      ...(manifest.full_tests || []).map((t) => ({ ...t, type: "full_tests" })),
      ...(manifest.subject_tests || []).map((t) => ({
        ...t,
        type: "subject_tests",
      })),
      ...(manifest.topic_tests || []).map((t) => ({
        ...t,
        type: "topic_tests",
      })),
    ],
    [manifest]
  );
  const examNames = useMemo(
    () => [
      "All Exams",
      ...new Set(allTests.map((t) => t.category).filter(Boolean).sort()),
    ],
    [allTests]
  );
  const topics = useMemo(() => {
    const topicSet = new Set();
    allTests.forEach((t) => {
      if (Array.isArray(t.topics)) t.topics.forEach((topic) => topicSet.add(topic));
      if (t.topic) topicSet.add(t.topic);
    });
    return ["All Topics", ...Array.from(topicSet).filter(Boolean).sort()];
  }, [allTests]);
  const subjects = useMemo(() => {
    const subjectSet = new Set();
    allTests.forEach((t) => {
      if (Array.isArray(t.subjects)) t.subjects.forEach((subject) => subjectSet.add(subject));
      if (t.subject) subjectSet.add(t.subject);
    });
    return ["All Subjects", ...Array.from(subjectSet).filter(Boolean).sort()];
  }, [allTests]);
  const tabCounts = useMemo(
    () =>
      TEST_TYPES.map((type) => {
        const count =
          type.id === "all"
            ? allTests.length
            : allTests.filter((t) => t.type === type.id).length;
        return { ...type, count };
      }),
    [allTests]
  );
  const filteredTests = useMemo(() => {
    return allTests
      .filter((t) => activeTab === "all" || t.type === activeTab)
      .filter((t) => selectedExam === "All Exams" || t.category === selectedExam)
      .filter((t) => 
        selectedTopic === "All Topics" || 
        t.topic === selectedTopic || 
        (Array.isArray(t.topics) && t.topics.includes(selectedTopic))
      )
      .filter((t) =>
        selectedSubject === "All Subjects" ||
        t.subject === selectedSubject ||
        (Array.isArray(t.subjects) && t.subjects.includes(selectedSubject))
      )
      .filter((t) =>
        selectedStrength === "All levels" ||
        t.exam_strength === selectedStrength
      )
      .filter((t) => {
        if (!searchTerm.trim()) return true;
        const search = searchTerm.toLowerCase().trim();
        const searchableFields = [
          t.exam_name, t.subject, t.topic, t.category,
          ...(Array.isArray(t.subjects) ? t.subjects : []),
          ...(Array.isArray(t.topics) ? t.topics : []),
        ].filter(Boolean).map((field) => field.toLowerCase());
        return searchableFields.some((field) => field.includes(search));
      })
      .sort((a, b) => (a.exam_name || "").localeCompare(b.exam_name || ""));
  }, [
    allTests, activeTab, selectedExam, selectedTopic, selectedSubject, selectedStrength, searchTerm,
  ]);
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm.trim() !== "" ||
      selectedExam !== "All Exams" ||
      selectedTopic !== "All Topics" ||
      selectedSubject !== "All Subjects" ||
      selectedStrength !== "All levels" ||
      activeTab !== "all"
    );
  }, [searchTerm, selectedExam, selectedTopic, selectedSubject, selectedStrength, activeTab]);
  const handleFilterChange = (name, value) => {
    switch (name) {
      case "examName":
        setSelectedExam(value);
        break;
      case "topic":
        setSelectedTopic(value);
        break;
      case "subject":
        setSelectedSubject(value);
        break;
      case "strength":
        setSelectedStrength(value);
        break;
      default:
        break;
    }
  };
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedExam("All Exams");
    setSelectedTopic("All Topics");
    setSelectedSubject("All Subjects");
    setSelectedStrength("All levels");
    setActiveTab("all");
  };
  return {
    loading,
    error,
    allTests,
    activeTab,
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    tabCounts,
    examNames,
    topics,
    subjects,
    STRENGTHS,
    filteredTests,
    hasActiveFilters,
    loadManifest,
    setActiveTab,
    setSearchTerm,
    handleFilterChange,
    clearAllFilters,
  };
}