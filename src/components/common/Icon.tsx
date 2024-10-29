import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  className?: string;
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={className} fontWeight={"normal"}/>;
};

export default Icon;
