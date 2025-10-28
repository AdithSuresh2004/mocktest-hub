import { useState, useEffect, useRef } from 'react'
import { calculateSectionStats } from '@/utils/helpers/examHelpers'

export function useQuestionNavigator({
  sections,
  currentSection,
  answers,
  markedForReview,
  onNavigate,
}) {
  const [visibleSectionIndex, setVisibleSectionIndex] = useState(currentSection)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const dropdownRef = useRef(null)
  useEffect(() => {
    setVisibleSectionIndex(currentSection)
  }, [currentSection])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const currentSectionData = sections?.[visibleSectionIndex] || { questions: [] }
  const stats = calculateSectionStats(
    currentSectionData.questions,
    answers,
    markedForReview
  )
  const handleSectionChange = (sectionIndex) => {
    setVisibleSectionIndex(sectionIndex)
    setIsDropdownOpen(false)
    onNavigate(sectionIndex, 0)
  }
  const handleQuestionClick = (qIndex) => {
    onNavigate(visibleSectionIndex, qIndex)
    setIsMobileOpen(false)
  }
  const toggleMobileOpen = () => {
    setIsMobileOpen((prev) => !prev)
  }
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }
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
  }
}
