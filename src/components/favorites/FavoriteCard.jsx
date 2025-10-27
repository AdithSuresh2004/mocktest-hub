import { FaPlay, FaListAlt, FaClock, FaStar, FaTrash, FaAward } from 'react-icons/fa'
import { getDifficultyColor, capitalizeStrength } from '@/utils/testHelpers'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'

const FavoriteCard = ({ favorite, onStart, onRemove }) => {
  return (
    <div
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      onClick={() => onStart(favorite.exam_id)}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FaStar className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <Badge variant="default">{favorite.type || 'Exam'}</Badge>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove(favorite.exam_id, favorite.exam_name, e)
          }}
          className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700"
          aria-label="Remove from favorites"
        >
          <FaTrash className="h-4 w-4" />
        </button>
      </div>
      
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {favorite.exam_name || `Exam ${favorite.exam_id}`}
      </h3>
      
      {favorite.subject && (
        <p className="mb-3 truncate text-sm text-gray-600 dark:text-gray-400">
          {favorite.subject}
        </p>
      )}
      
      {favorite.exam_strength && (
        <div className="mb-3">
          <Badge variant="warning">{capitalizeStrength(favorite.exam_strength)}</Badge>
        </div>
      )}
      
      <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
        {favorite.duration_minutes && (
          <div className="flex items-center gap-1.5">
            <FaClock className="h-4 w-4" />
            <span>{favorite.duration_minutes} mins</span>
          </div>
        )}
        {favorite.total_questions && (
          <div className="flex items-center gap-1.5">
            <FaListAlt className="h-4 w-4" />
            <span>{favorite.total_questions} ques</span>
          </div>
        )}
        {favorite.total_marks && (
          <div className="flex items-center gap-1.5">
            <FaAward className="h-4 w-4" />
            <span>{favorite.total_marks} marks</span>
          </div>
        )}
      </div>
      
      <Button
        onClick={(e) => {
          e.stopPropagation()
          onStart(favorite.exam_id)
        }}
        variant="primary"
        className="w-full"
        icon={FaPlay}
      >
        Start Exam
      </Button>
    </div>
  )
}

export default FavoriteCard

