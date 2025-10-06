import { useNavigate } from 'react-router-dom'
import { FaHourglassHalf } from 'react-icons/fa'
import EmptyState from '@/components/common/EmptyState'

export default function NoPendingTests() {
  const navigate = useNavigate()

  return (
    <EmptyState
      icon={FaHourglassHalf}
      title="No Pending Tests"
      description="You don't have any incomplete exams at the moment"
      actionLabel="Browse Exams"
      onAction={() => navigate('/exams')}
    />
  )
}
