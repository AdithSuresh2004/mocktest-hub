import Card from "@/components/common/Card";
import { cn } from "@/utils/cn";

interface Tab {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
}) => {
  const baseButtonClasses =
    "flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-4 text-center text-sm font-medium transition-all duration-200 md:flex-initial md:flex-grow";
  const activeButtonClasses =
    "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400";
  const inactiveButtonClasses =
    "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-300";

  const activeCountClasses =
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
  const inactiveCountClasses =
    "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400";

  return (
    <Card variant="default" padding="none" className={className}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between overflow-x-auto md:justify-start">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  baseButtonClasses,
                  isActive ? activeButtonClasses : inactiveButtonClasses,
                )}
              >
                {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                <span
                  className={cn(
                    "overflow-hidden text-ellipsis whitespace-nowrap",
                    isActive ? "inline" : "hidden md:inline",
                  )}
                >
                  {tab.label}
                </span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "hidden rounded-full px-2 py-0.5 text-xs md:inline-block",
                      isActive ? activeCountClasses : inactiveCountClasses,
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default TabGroup;
