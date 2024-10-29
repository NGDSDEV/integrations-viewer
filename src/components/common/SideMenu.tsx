import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

import MenuItem from "./MenuItem";

import { icons } from "lucide-react";

interface ISideMenuItem {
  icon: keyof typeof icons;
  label: string;
  route: string;
}

const NavBar = () => {
  const router = useRouter();
  const stateSideMenu = useAppSelector((state) => state.general.showSideMenu);
  const options: Array<ISideMenuItem> = [
    { icon: "ContactRound", label: "Operadores Logísticos", route: "operador" },
    { icon: "MessageCircle", label: "Mensajes de Integración", route: "mensajes" },
    { icon: "CarTaxiFront", label: "Estados - Tracking", route: "estados" },
    { icon: "TableOfContents", label: "Tablas Referenciales", route: "estados" },
  ];

  const handleNavigation = useCallback(
    (route: string) => {
      router.push(`/modulos/${route}`, { scroll: false });
    },
    [router]
  );

  const renderMenuItems = (isMobile: boolean) => (
    <div className={`flex ${isMobile ? "justify-around" : "flex-col items-center w-full"}`}>
      {options.map(({ icon, label, route }, index) => (
        <MenuItem icon={icon} colorIcon={`${isMobile ? "white" : "black"}`} label={label} key={index} action={() => handleNavigation(route)} />
      ))}
    </div>
  );

  return (
    <section>
      {/* Menú lateral para dispositivos de mayor tamaño */}
      <div className="hidden md:flex md:h-screen md:w-[112px] bg-white border-r">{renderMenuItems(false)}</div>

      {/* Menú móvil */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-highest border-t shadow-lg md:hidden transition-transform duration-300 ${stateSideMenu ? "transform translate-y-0" : "transform translate-y-full"
          }`}
      >
        {renderMenuItems(true)}
      </div>
    </section>
  );
};

export default NavBar;
