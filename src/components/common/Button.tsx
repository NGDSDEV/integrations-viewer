import Icon from "./Icon";
import { icons } from "lucide-react";

interface IButtonProps {
  text?: string;
  size?: number;
  colorIcon?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  addIcon?: keyof typeof icons;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IButtonProps> = ({ children, addIcon, text, size, onClick, disabled, className = false, colorIcon, type = "button" }) => {
  return (
    <button type={type} className={`flex items-center ${className}`} onClick={onClick} disabled={disabled}>
      {text && <p className="mr-2">{text}</p>}
      {children}
      {addIcon && <Icon name={addIcon} size={size ?? 20} color={colorIcon} />}
    </button>
  );
};

export default Button;
