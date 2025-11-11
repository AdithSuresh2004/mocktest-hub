import { Attempt } from "@/types";
import AttemptItem from "@/components/attempts/AttemptItem";

interface AttemptListProps {
  attempts?: Attempt[];
}

const AttemptList: React.FC<AttemptListProps> = ({ attempts = [] }) => {
  if (attempts.length === 0) {
    return (
      <div className="rounded-xl bg-white py-12 text-center shadow-sm dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          No Attempts Found
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          You haven't completed any tests yet. Start a test to see your results
          here.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {attempts.map((attempt) => (
        <AttemptItem key={attempt.id} attempt={attempt} />
      ))}
    </div>
  );
};

export default AttemptList;
