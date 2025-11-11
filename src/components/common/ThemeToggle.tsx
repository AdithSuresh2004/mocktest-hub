import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/stores/themeStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => toggleTheme(isDark ? "light" : "dark")}
      className="cursor-pointer rounded-md border border-gray-200 p-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
