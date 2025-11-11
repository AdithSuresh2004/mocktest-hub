import StatCard from "@/components/common/StatCard";

interface ScoreCardsAnalysis {
  overall: { text?: string; color?: string };
  score: { actual?: number; total?: number };
  accuracy: { percentage?: number };
}

interface ResultScoreCardsProps {
  analysis?: ScoreCardsAnalysis | null;
}

const ResultScoreCards: React.FC<ResultScoreCardsProps> = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 dark:bg-gray-800"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Data not available
            </p>
          </div>
        ))}
      </div>
    );
  }

  const { overall, score, accuracy } = analysis;

  const stats = [
    {
      name: "Overall Score",
      stat: `${Number(score.actual || 0).toFixed(1)}/${Number(score.total || 1)}`,
      color: "green" as const,
    },
    {
      name: "Accuracy",
      stat: `${Number(accuracy.percentage || 0).toFixed(1)}%`,
      color: "blue" as const,
    },
    {
      name: "Performance Level",
      stat: overall.text || "Good",
      color: overall.color?.includes("green")
        ? ("green" as const)
        : overall.color?.includes("red")
          ? ("red" as const)
          : ("yellow" as const),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {stats.map((item) => (
        <StatCard
          key={item.name}
          label={item.name}
          value={item.stat}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default ResultScoreCards;
