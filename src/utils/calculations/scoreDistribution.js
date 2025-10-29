const calculateScoreDistribution = (completedExams) => {
  const distributionData = [
    { name: '90-100%', value: 0, color: '#10b981' },
    { name: '75-89%', value: 0, color: '#3b82f6' },
    { name: '50-74%', value: 0, color: '#f59e0b' },
    { name: '0-49%', value: 0, color: '#ef4444' },
  ]

  completedExams.forEach((exam) => {
    const score = exam.score || 0
    if (score >= 90) {
      distributionData[0].value++
    } else if (score >= 75) {
      distributionData[1].value++
    } else if (score >= 50) {
      distributionData[2].value++
    } else {
      distributionData[3].value++
    }
  })

  return distributionData.filter((item) => item.value > 0)
}

export { calculateScoreDistribution }
