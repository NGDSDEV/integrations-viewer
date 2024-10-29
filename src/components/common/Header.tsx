"use client";

import { changeStateSideMenu } from "@/lib/features/common/general";
import { Poppins } from "next/font/google";
import { resetUserInfo } from "@/lib/features/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Button from "./Button";
import Icon from "./Icon";
import Image from "next/image";
import LogoHeader from "../../../public/colsubsidio_header.webp";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.auth.userInfo);
  const stateSideMenu = useAppSelector((state) => state.general.showSideMenu);

  const handleSideMenu = () => {
    dispatch(changeStateSideMenu(!stateSideMenu));
  };

  const handleLogout = () => {
    dispatch(resetUserInfo());
  };

  return (
    <header className="shadow-md flex justify-between items-center bg-white z-10 relative">
      <div className="flex items-center">
        <Image src={LogoHeader} style={{ width: "auto", height: "auto" }} width={168} height={160} alt="logo colsubsidio" priority={true} />
        <p className={`${poppins.className} antialiased text-highest ml-2 text-xs sm:text-base`}>| Integrador de Operadores Logísticos</p>
      </div>

      {userAuth && <div className="hidden md:flex items-center px-4 space-x-4">
        <Icon name="CircleUser" size={20} />
        <div className="flex flex-col items-start">
          <p className="font-semibold text-sm">Te damos la bienvenida</p>
          <ins className={`${poppins.className} antialiased text-highest text-xs`}>{userAuth?.informacionPersonal.nombre.completo}</ins>
        </div>
        <Button onClick={handleLogout} className="border rounded-2xl border-highest" >
          <p className="text-xs py-2 px-5">Cerrar sesión</p>
        </Button>
      </div>}

      {/* Botón de menú para dispositivos móviles */}
      <div className="md:hidden px-4">
        <Button addIcon="Menu" onClick={() => handleSideMenu()}></Button>
      </div>
    </header>
  );
};

export default Header;
