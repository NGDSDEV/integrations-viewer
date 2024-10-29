import AutoComplete from "@/components/common/AutoComplete";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import InputViewJson from "@/components/common/InputViewJson";
import ModalTableSearch from "@/components/common/ModalTableSearch";
import Textarea from "@/components/common/Textarea";
import { ContainerForm } from "@/components/forms/register-operator/ContainerForm";
import { useStepValidation } from "@/context/steps/steps";
import useLogisticsOperator from "@/hooks/useLogisticsOperator";
import { ILogisticsOperator } from "@/types/logisticsOperator";
import { Poppins } from "next/font/google";
import { useEffect } from "react";

const poppins400 = Poppins({ weight: "400", subsets: ["latin"] });

const signatureAuth = JSON.stringify({
  access_token: "d0590dfe87126ba6e8993ade0407307282cb693c",
  expires_in: 3600,
  token_type: "Bearer",
  scope: null,
});

const estados = [
  { value: "ACTIVO", label: "ACTIVO" },
  { value: "INACTIVO", label: "INACTIVO" },
];

export const FirtsStep = () => {
  const { setIsValidStep } = useStepValidation();

  const {
    control,
    errors,
    isValid,
    isValidOperator,
    listOperators,
    showModalOperator,
    values,
    handleOperatorSelect,
    handleSubmit,
    onSubmit,
    register,
    resetForm,
    saveSignature,
    setShowModalOperator,
    setValue,
  } = useLogisticsOperator(signatureAuth);

  useEffect(() => {
    // if (isValid && values.operatorId) {
      setIsValidStep(true);
    // }
  }, [isValid, values.operatorId]);

  return (
    <ContainerForm title="Datos del operador" className="justify-between" iconButton="Paintbrush" onClick={resetForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          requiered
          label="NIT"
          postIcon="Search"
          error={errors.nit}
          register={{ ...register("nit") }}
          onClickPostIcon={() => setShowModalOperator(true)}
        />

        <Input requiered disabled={isValidOperator} error={errors.name} label="Nombre" register={{ ...register("name") }} uppercase />

        <AutoComplete requiered name="estado" error={errors.estado} label="Estado" options={estados} control={control} />

        <Input requiered error={errors.codigo} label="Código de Operador" register={{ ...register("codigo") }} />

        <Input requiered error={errors.url} label="URL" register={{ ...register("url") }} />

        <InputViewJson
          label="Subir Firma"
          setValue={(field, value) => setValue(field as keyof ILogisticsOperator, value)}
          signature={values.signature}
          error={errors.signature}
        />

        {values.operatorId && <Textarea error={errors.signatureAuth} label="Firma de Autenticación" register={{ ...register("signatureAuth") }} />}

        <div className="flex gap-2">
          <Button type="submit" className={`border rounded-2xl bg-highest`}>
            <p className={`${poppins400.className} text-sm py-2 px-10 text-low`}>{values.operatorId ? "Actualizar" : "Registrar"}</p>
          </Button>
          {values.operatorId && (
            <Button className={`text-sm border border-highest rounded-2xl bg-low`} onClick={saveSignature}>
              <p className={`${poppins400.className} text-sm py-2 px-10 text-highest`}>Guardar Firma</p>
            </Button>
          )}
        </div>
      </form>

      <ModalTableSearch
        data={listOperators}
        headers={["NIT", "Nombre", "Estado", "Código", "URL"]}
        isOpen={showModalOperator}
        keys={["nit", "name", "estado", "codigo", "url"]}
        onClose={() => setShowModalOperator(false)}
        onSelect={handleOperatorSelect}
        title="Lista de Operadores"
      />
    </ContainerForm>
  );
};
