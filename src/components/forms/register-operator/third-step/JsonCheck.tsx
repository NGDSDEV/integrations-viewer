import JsonView from "react18-json-view";
import ModalContainer from "../../../common/ModalContainer";
import Button from "@/components/common/Button";
import { Poppins } from "next/font/google";

const poppins400 = Poppins({ weight: "400", subsets: ["latin"] });
export const JsonCheck = ({ json, onClose, isOpen, onOk }: { json: object; onClose: () => void; isOpen: boolean; onOk?: () => void }) => {
  return (
    <ModalContainer
      title="Parametros por registrar"
      isOpen={isOpen}
      onClose={onClose}
      className="min-w-[400px] h-auto max-h-none min-h-none"
    >
      <div className="flex flex-col gap-4">
        <JsonView
          src={json}
          collapseStringsAfterLength={8}
          collapsed={1}
          displaySize={true}
          style={{ fontSize: "0.9rem", maxHeight: "500px", overflow: "auto" }}
          theme="winter-is-coming"
        />
       <div className="flex justify-end">
         <Button type="submit" className={`${poppins400.className} w-full flex justify-center border rounded-2xl bg-highest`} onClick={onOk}>
           <p className="text-xs py-2 px-6 text-low"> Continuar </p>
         </Button>
       </div>
      </div>
    </ModalContainer>
  );
};
