import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { calculateSectionStats } from "@/utils/examHelpers"; 
export function useQuestionNavigator({
  sections,
  currentSection,
  answers,
  markedForReview,
  onNavigate,
}) {
  const [visibleSectionIndex, setVisibleSectionIndex] = useState(currentSection);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    setVisibleSectionIndex(currentSection);
  }, [currentSection]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const currentSectionData = useMemo(() => 
    sections[visibleSectionIndex] || { questions: [] }, 
    [sections, visibleSectionIndex]
  );
  const stats = useMemo(() => 
    calculateSectionStats(currentSectionData.questions, answers, markedForReview),
    [currentSectionData.questions, answers, markedForReview]
  );
  const handleSectionChange = useCallback((sectionIndex) => {
    setVisibleSectionIndex(sectionIndex);
    setIsDropdownOpen(false);
    onNavigate(sectionIndex, 0); 
  }, [onNavigate]);
  const handleQuestionClick = useCallback((qIndex) => {
    onNavigate(visibleSectionIndex, qIndex);
    setIsMobileOpen(false); 
  }, [onNavigate, visibleSectionIndex]);
  const toggleMobileOpen = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);
  const toggleDropdown = useCallback(() => {
      setIsDropdownOpen(prev => !prev);
  }, []);
  return {
    isMobileOpen,
    isDropdownOpen,
    dropdownRef,
    currentSectionData,
    visibleSectionIndex,
    stats,
    toggleMobileOpen,
    toggleDropdown,
    handleSectionChange,
    handleQuestionClick,
    closeMobile: () => setIsMobileOpen(false),
  };
}