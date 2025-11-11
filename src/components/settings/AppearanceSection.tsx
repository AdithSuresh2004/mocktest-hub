import { FaCog, FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import Section from "@/components/common/Section";

type ThemeMode = "light" | "dark" | "system";

interface AppearanceSectionProps {
  theme: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <Section
      title="Appearance"
      icon={FaCog}
      iconColor="text-violet-600 dark:text-violet-400"
      iconBgColor="bg-violet-100 dark:bg-violet-900/30"
    >
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onThemeChange("light")}
          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
            theme === "light"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          }`}
        >
          <FaSun className="h-6 w-6 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Light
          </span>
        </button>
        <button
          onClick={() => onThemeChange("dark")}
          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
            theme === "dark"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          }`}
        >
          <FaMoon className="h-6 w-6 text-blue-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Dark
          </span>
        </button>
        <button
          onClick={() => onThemeChange("system")}
          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
            theme === "system"
              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          }`}
        >
          <FaDesktop className="h-6 w-6 text-purple-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            System
          </span>
        </button>
      </div>
    </Section>
  );
};

export default AppearanceSection;
