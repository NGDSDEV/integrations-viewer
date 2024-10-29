import { icons } from "lucide-react";
import { Poppins } from "next/font/google";
import Button from "@/components/common/Button";
import Tooltip from "@/components/common/Tooltip";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

export const ContainerForm = ({
  children,
  title,
  iconButton,
  onClick,
  className,
}: {
  readonly children: React.ReactNode;
  title: string;
  className?: string;
  iconButton?: keyof typeof icons;
  onClick?: () => void;
}) => {
  return (
    <section className="shadow-md text-2xl bg-white rounded-lg p-10 w-[650px]">
      <h2 className={`${poppins.className} antialiased flex gap-2 items-center ${className}`}>
        {title}{" "}
        {onClick && (
          <Tooltip text="Limpiar formulario">
            <Button {...(iconButton ? { addIcon: iconButton } : {})} onClick={onClick} />
          </Tooltip>
        )}
      </h2>
      {children}
    </section>
  );
};
