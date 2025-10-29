import StatCard from '@/components/common/StatCard'

const ResultScoreCards = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:p-6"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Data not available
            </p>
          </div>
        ))}
      </div>
    )
  }
  const { overall, score, speed, accuracy } = analysis

  const stats = [
    {
      name: 'Overall Score',
      stat: `${Number(score.actual || 0).toFixed(1)}/${Number(score.total || 1)}`,
      color: 'green',
    },
    {
      name: 'Accuracy',
      stat: `${Number(accuracy.percentage || 0).toFixed(1)}%`,
      color: 'blue',
    },
    {
      name: 'Performance Level',
      stat: overall.text || 'Good',
      color: overall.color?.includes('green')
        ? 'green'
        : overall.color?.includes('red')
          ? 'red'
          : 'yellow',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <StatCard
          key={item.name}
          label={item.name}
          value={item.stat}
          color={item.color}
        />
      ))}
    </div>
  )
}

export default ResultScoreCards
