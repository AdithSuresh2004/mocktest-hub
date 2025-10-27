import { FaHome, FaFileAlt, FaBook, FaBullseye } from 'react-icons/fa'
import TabGroup from '@/components/common/TabGroup'

const TEST_TYPE_ICONS = {
  all: FaHome,
  full_tests: FaFileAlt,
  subject_tests: FaBook,
  topic_tests: FaBullseye,
}

const ExamTabs = ({ tabCounts, activeTab, onTabChange }) => {
  const tabs = tabCounts.map((tab) => ({
    ...tab,
    icon: TEST_TYPE_ICONS[tab.id],
  }))

  return (
    <div className="mb-6 w-full">
      <TabGroup tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
    </div>
  )
}

export default ExamTabs
