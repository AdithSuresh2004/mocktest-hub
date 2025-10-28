export const sortTests = (tests, sortOrder) => {
  const sortedTests = [...tests]

  switch (sortOrder) {
    case 'name-asc':
      sortedTests.sort((a, b) => a.exam_name.localeCompare(b.exam_name))
      break
    case 'name-desc':
      sortedTests.sort((a, b) => b.exam_name.localeCompare(a.exam_name))
      break
    case 'strength-asc':
      sortedTests.sort((a, b) => (a.exam_strength || '').localeCompare(b.exam_strength || ''))
      break
    case 'strength-desc':
      sortedTests.sort((a, b) => (b.exam_strength || '').localeCompare(a.exam_strength || ''))
      break
    default:
      break
  }

  return sortedTests
}
