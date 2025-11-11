import { cn } from "@/utils/cn";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
      className,
    )}
    {...props}
  />
);

export default Skeleton;
