import Card from "@/components/common/Card";

interface HighlightCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  caption?: string;
  accent?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  icon,
  label,
  value,
  caption,
  accent,
}) => (
  <Card
    variant="default"
    padding="md"
    hover
    className="flex flex-col gap-3 rounded-2xl"
  >
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${accent}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
    {caption && (
      <p className="text-sm text-gray-500 dark:text-gray-400">{caption}</p>
    )}
  </Card>
);

export default HighlightCard;
