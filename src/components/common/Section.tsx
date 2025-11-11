import { cn } from "@/utils/cn";
import Card from "@/components/common/Card";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  iconBgColor?: string;
  actions?: React.ReactNode;
  variant?: "default" | "gradient" | "transparent";
  padding?: string;
}

const Section = ({
  children,
  className,
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-600 dark:text-blue-400",
  iconBgColor = "bg-blue-100 dark:bg-blue-900/30",
  actions,
  variant = "default",
  padding = "p-6",
}: SectionProps) => (
  <Card variant={variant} padding="none" className={className}>
    {(title || description || actions) && (
      <div
        className={cn("border-b border-gray-200 dark:border-gray-700", padding)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  iconBgColor,
                )}
              >
                <Icon className={cn("h-5 w-5", iconColor)} />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    )}
    <div className={padding}>{children}</div>
  </Card>
);

export default Section;
