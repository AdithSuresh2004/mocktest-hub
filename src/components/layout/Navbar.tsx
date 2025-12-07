import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle";
import Button from "@/components/common/Button";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar = () => {} }: NavbarProps) => {
  return (
    <header className="z-50 bg-white shadow-md dark:bg-gray-800 dark:shadow-black/20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label="Open menu"
            aria-controls="mobile-sidebar"
          >
            <RxHamburgerMenu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              MockTest Hub
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
