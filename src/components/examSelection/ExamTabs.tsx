import { FaHome, FaFileAlt, FaBook, FaBullseye } from "react-icons/fa";
import TabGroup from "@/components/common/TabGroup";
import type { IconType } from "react-icons";
import type { TabId, TestTypeCount } from "@/types";

const TEST_TYPE_ICONS: Record<TabId, IconType> = {
  all: FaHome,
  full_tests: FaFileAlt,
  subject_tests: FaBook,
  topic_tests: FaBullseye,
};

interface ExamTabsProps {
  tabCounts: TestTypeCount[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ExamTabs: React.FC<ExamTabsProps> = ({
  tabCounts,
  activeTab,
  onTabChange,
}) => {
  const tabs = tabCounts.map((tab) => ({
    ...tab,
    icon: TEST_TYPE_ICONS[tab.id],
  }));

  return (
    <div className="mb-6 w-full">
      <TabGroup tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
    </div>
  );
};

export default ExamTabs;
