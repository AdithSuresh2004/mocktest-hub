import { cn } from "@/utils/cn";

interface PageContainerProps {
  className?: string;
  children: React.ReactNode;
}

const PageContainer = ({ className, children }: PageContainerProps) => (
  <div
    className={cn(
      "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
      className,
    )}
  >
    {children}
  </div>
);

export default PageContainer;
