import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export const NavigationMenu = ({ className }: { className?: string }) => {
  const sections = [
    { id: "general-information", text: "Información General" },
    { id: "delivery-dates", text: "Fechas de entregas" },
    { id: "user", text: "Usuario" },
    { id: "origin", text: "Origen" },
    { id: "destination", text: "Destino" },
    { id: "order-details", text: "Detalles de orden" },
    { id: "logistics", text: "Logística" },
    { id: "products", text: "Productos" },
    { id: "customer", text: "Cliente" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${className} hidden sm:block text-xs px-2 pb-4 pt-2 md:text-sm`}>
      <div className="flex justify-center">
        {sections.map((section, index) => (
          <button key={section.id} onClick={() => scrollToSection(section.id)}>
            <span className={`${poppins.className} antialiased hover:text-primary`}>
              {section.text}
              {index < sections.length - 1 && " / "}
              &nbsp;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
