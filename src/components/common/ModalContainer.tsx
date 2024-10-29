import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import Button from "./Button";

const poppins700 = Poppins({ weight: "700", subsets: ["latin"] });
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
  className?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title, className }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-lg w-auto">
        <header className="flex justify-between py-4 p-8 border-[3px] rounded-x-3xl rounded-t-3xl border-gray-300">
          <h4 className={`${poppins700.className} text-2xl`}>{title}</h4>
          <Button addIcon="X" onClick={onClose}>
          </Button>
        </header>
        <main className={`p-5 min-w-[800px] max-h-[600px] min-h-[600px] border-x-[3px] border-b-[3px] rounded-x-3xl rounded-b-3xl border-gray-300 ${className}`}>
          {children}
        </main>
      </div>
    </section>
  );
};

export default Modal;