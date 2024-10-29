import { Poppins } from "next/font/google";
import "../../ui/styles.css";
import Button from "./Button";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Badge = ({ name, className, onClick }: { name: string; className?: string, onClick?: ()=> void  }) => (
  <label className={`${className} ${poppins.className} border flex items-center rounded-lg text-xs p-1 bg-low`}>
    ● {name} <Button className="ml-1.5" addIcon="X" size={15} onClick={onClick} />
  </label>
);

export default Badge;
