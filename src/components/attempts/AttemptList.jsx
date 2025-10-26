import AttemptItem from '@/components/attempts/AttemptItem'

const AttemptList = ({ attempts = [] }) => {
  if (attempts.length === 0) {
    return (
      <div className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          No Attempts Found
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Looks like you haven't completed any tests that match the current
          filters.
        </p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {attempts.map((attempt) => (
        <AttemptItem key={attempt.id || attempt.attempt_id} attempt={attempt} />
      ))}
    </div>
  )
}

export default AttemptList
