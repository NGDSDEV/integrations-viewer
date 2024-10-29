import { Poppins } from "next/font/google";
import Image from "next/image";
import LogoSuperCol from "../../../public/logo_supervigilado.webp";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center py-4 bg-white">
      <div className="flex items-center mb-2 md:mb-0">
        <Image src={LogoSuperCol} style={{ width: "auto", height: "auto" }} width={144} height={21} alt="logo colsubsidio" priority={true} />
      </div>
      <div className={`${poppins.className} antialiased text-xs text-center md:text-left text-highest`}>
        Todos los derechos reservados © Colsubsidio 2024
      </div>
    </footer>
  );
};

export default Footer;
