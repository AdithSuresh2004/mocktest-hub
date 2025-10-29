import { useState, useEffect } from 'react'

const usePagination = (items, initialPageSize = 12) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  useEffect(() => {
    setCurrentPage((prev) => (items.length !== 0 ? 1 : prev))
  }, [items.length])

  const totalPages = Math.ceil(items.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = items.slice(startIndex, endIndex)

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changePageSize = (newSize) => {
    setPageSize(newSize)
    setCurrentPage(1)
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems: items.length,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    resetPagination,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: (currentPage - 1) * pageSize + 1,
    endIndex: Math.min(currentPage * pageSize, items.length),
  }
}

export { usePagination }
