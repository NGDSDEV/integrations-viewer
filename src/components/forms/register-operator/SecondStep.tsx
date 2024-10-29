/* eslint-disable react-hooks/exhaustive-deps */
import "../../../ui/styles.css";
import { ContainerForm } from "@/components/forms/register-operator/ContainerForm";
import { IDispensary } from "@/types/forms/dispensary";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useStratification } from "@/hooks/useStratification";
import AutoComplete from "@/components/common/AutoComplete";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ModalTableSearch from "@/components/common/ModalTableSearch";

const poppins400 = Poppins({ weight: "400", subsets: ["latin"] });
interface IBadge {
  points: IDispensary[];
  onRemove: (point: IDispensary) => void;
}

const ContainerBadge = ({ points, onRemove }: IBadge) => (
  <div className="border rounded-lg flex flex-wrap gap-1 p-1">
    {points.map((point) => (
      <Badge key={crypto.randomUUID()} name={`${point.code} - ${point.address}`} onClick={() => onRemove(point)} />
    ))}
  </div>
);

export const SecondStep = () => {
  const [points, setPoints] = useState<IDispensary[]>([]);
  const [dispensaries, setDispensaries] = useState<IDispensary[]>([]);

  const handleDispensaries = (point: IDispensary) => {
    setDispensaries((prevPoints) => prevPoints.filter((p) => p !== point));
  };

  const {
    control,
    errors,
    isValid,
    optionsCities,
    optionsDepartments,
    optionsorderGeneratorIds,
    optionsTypeService,
    showModalPointsOrigen,
    stratification,
    getStratification,
    getDispensaries,
    getCities,
    getOrderGenerator,
    handleSubmit,
    onSubmit,
    register,
    setIsValidStep,
    setShowModalPointsOrigen,
    watch,
  } = useStratification(setPoints, dispensaries, setDispensaries);

  useEffect(() => {
    setIsValidStep(true);
  }, [isValid, setIsValidStep]);

  useEffect(() => {
    getStratification();
  }, []);

  useEffect(() => {
    if (watch().typeService) getOrderGenerator();
    if (watch().departments) getCities();
    if (watch().citiesOrigin) getDispensaries();
  }, [watch().citiesOrigin, watch().departments, watch().typeService]);

  const resetDispensaries = () => {
    setDispensaries([]);
  };

  return (
    <ContainerForm title="Datos de Estratificación">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input disabled error={errors.nit} label="NIT" register={{ ...register("nit") }} />

        <Input disabled label="Operador Logístico" register={{ ...register("operatorLog") }} />

        <AutoComplete name="typeService" options={optionsTypeService} control={control} error={errors.typeService} label="Tipo de Servicio" />

        <AutoComplete
          name="orderGeneratorId"
          disabled={!watch().typeService}
          options={optionsorderGeneratorIds}
          error={errors.orderGeneratorId}
          control={control}
          label="Generador de Pedido"
        />

        <AutoComplete
          name="departments"
          onChangeProp={resetDispensaries}
          options={optionsDepartments}
          error={errors.departments}
          control={control}
          label="Departamentos"
        />

        <AutoComplete
          name="citiesOrigin"
          disabled={!watch().departments}
          options={optionsCities}
          error={errors.citiesOrigin}
          control={control}
          onChangeProp={resetDispensaries}
          label="Ciudades de Origen"
        />

        {watch().citiesOrigin && (
          <Button
            disabled={!watch().citiesOrigin}
            onClick={() => setShowModalPointsOrigen(true)}
            className="text-center w-full border rounded-lg p-2 flex justify-center"
          >
            <span className="text-center text-sm">Selecionar puntos de origen</span>{" "}
          </Button>
        )}
        {dispensaries.length > 0 && <ContainerBadge points={dispensaries} onRemove={handleDispensaries} />}
        <Button type="submit" className={`${poppins400.className}  border rounded-2xl bg-highest`}>
        <p className={`${poppins400.className} text-sm py-2 px-10 text-low`}> {stratification ? "Actualizar" : "Registrar"} </p>
        </Button>
      </form>

      <ModalTableSearch<IDispensary>
        headers={["Nombre", "Dirección", "Código", "Tel.", "Estado"]}
        keys={["dispensary_name", "address", "code", "phone", "status"]}
        onClose={() => setShowModalPointsOrigen(false)}
        title="Lista de Puntos de Origen"
        isOpen={showModalPointsOrigen}
        setSelected={setDispensaries}
        itemsSelected={dispensaries}
        data={points}
        selected
      />
    </ContainerForm>
  );
};
