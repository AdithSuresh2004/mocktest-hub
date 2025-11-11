import type { ReactNode } from "react";
import { IconType } from "react-icons";
import Section from "@/components/common/Section";

interface SettingsCardProps {
  title: string;
  description: string;
  icon: IconType;
  iconClassName?: string;
  iconColor?: string;
  iconBgColor?: string;
  children: ReactNode;
}

const SettingsCard = ({
  title,
  description,
  icon,
  iconColor,
  iconBgColor,
  children,
}: SettingsCardProps) => (
  <Section
    title={title}
    description={description}
    icon={icon}
    iconColor={iconColor}
    iconBgColor={iconBgColor}
  >
    {children}
  </Section>
);

export default SettingsCard;
