import Icon from "./Icon";
import { icons } from "lucide-react";
import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export interface IMenuItem {
  icon: keyof typeof icons;
  label: string;
  colorIcon?: string;
  action: () => void;
}

const MenuItem: React.FC<IMenuItem> = ({ icon, label, action, colorIcon }) => {
  return (
    <div className="flex flex-col items-center mt-6">
      <button className="flex flex-col items-center p-2" onClick={action}>
        <Icon name={icon} size={25} color={colorIcon} />
        <p className={`text-xs mt-1 ${poppins.className} text-${colorIcon} text-center antialiased`}>{label}</p>
      </button>
    </div>
  );
};

export default MenuItem;
