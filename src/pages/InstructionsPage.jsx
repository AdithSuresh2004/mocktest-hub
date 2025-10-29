import Button from '@/components/common/Button'
import InstructionContent from '@/components/exam/InstructionContent'

const InstructionsPage = ({ exam, onStart }) => {
  if (!exam) return null
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-colors duration-200 dark:bg-gray-900">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg transition-colors duration-200 2xl:max-w-6xl dark:bg-gray-800">
        <InstructionContent exam={exam} />
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => window.history.back()}
            variant="secondary"
            size="lg"
          >
            Cancel
          </Button>
          <Button onClick={onStart} variant="primary" size="lg">
            Start Exam
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InstructionsPage
