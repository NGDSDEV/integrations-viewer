/* eslint-disable react-hooks/exhaustive-deps */
import { useStepValidation } from "@/context/steps/steps";
import { showToast } from "@/lib/features/common/toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { stratificationSchema } from "@/schemas/operatorForms";
import {
  createStratificationService,
  getCitiesService,
  getDepartmentService,
  getDispensariesService,
  getOrderGeneratorService,
  getServiceTypeService,
  getStratificationService,
  updateStratificationService,
} from "@/services/stratificationServices";
import { IDispensary } from "@/types/forms/dispensary";
import { ICities, IDepartment, IOrderGenerator, IStratification, ITypeService } from "@/types/forms/stratification";
import { callService } from "@/utils/serviceHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useStratification = (
  setPoints: Dispatch<SetStateAction<IDispensary[]>>,
  dispensaries: IDispensary[],
  setDispensaries: Dispatch<SetStateAction<IDispensary[]>>
) => {
  const dispatch = useAppDispatch();
  const { setIsValidStep } = useStepValidation();
  const [optionsCities, setOptionsCities] = useState([]);
  const [stratification, setStratification] = useState(false);
  const [optionsTypeService, setOptionsTypeService] = useState([]);
  const [optionsDepartments, setOptionsDepartments] = useState([]);
  const [showModalPointsOrigen, setShowModalPointsOrigen] = useState(false);
  const [optionsorderGeneratorIds, setOptionsorderGeneratorIds] = useState([]);
  const operatorCurrent = useAppSelector((state) => state.logisticsIntegrator.operatorCurrent);

  const defaultValues: IStratification = {
    nit: operatorCurrent?.nit ?? "",
    operatorLog: operatorCurrent?.name ?? "",
    logisticOperatorId: operatorCurrent?.operatorId ?? "",
    typeService: "",
    orderGeneratorId: "",
    departments: "",
    citiesOrigin: "",
    codeDispensaryIds: [],
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    resetField,
    formState: { errors, isValid },
  } = useForm<IStratification>({ defaultValues, resolver: yupResolver(stratificationSchema) as any, });

  useEffect(() => {
    if (!operatorCurrent?.operatorId) resetForm();
  }, [operatorCurrent?.operatorId]);

  const resetForm = () => {
    resetField("nit");
    resetField("operatorLog");
    resetField("typeService");
    resetField("orderGeneratorId");
    resetField("departments");
    resetField("citiesOrigin");
    resetField("codeDispensaryIds");
  };

  const onSubmit: SubmitHandler<IStratification> = (data) => {
    if (dispensaries.length < 1) {
      dispatch(showToast({ type: "warning", title: "Sin puntos de origen", description: "Debe seleccionar al menos un punto de origen" }));
      return;
    }

    if (stratification) updateStratification(data);
    else createStratification(data);
  };

  const createStratification = async (data: IStratification) => {
    const newCodeDispensaryIds = dispensaries.map((item) => item.code);
    await callService(
      dispatch,
      () => createStratificationService(newCodeDispensaryIds, data.orderGeneratorId, data.logisticOperatorId),
      "Estratificación creada",
      "Error al crear los datos de estratificación"
    );

    setStratification(true);
  };

  const updateStratification = async (data: IStratification) => {
    const newCodeDispensaryIds = dispensaries.map((item) => item.code);
    await callService(
      dispatch,
      () => updateStratificationService(newCodeDispensaryIds, data.orderGeneratorId, data.logisticOperatorId),
      "Estretificación actualizada",
      "Error al actualizar los datos de estratificación"
    );

    setStratification(true);
  };

  const getStratification = async () => {
    if (!operatorCurrent) return;
    const response = await callService(
      dispatch,
      () => getStratificationService(operatorCurrent.operatorId),
      "Estretificación obtenida",
      "Error al obtener los datos de estratificación"
    );
    console.log("💠  response--> ", response);

    if (response) {
      setValue("typeService", response.serviceType.serviceId);
      setValue("orderGeneratorId", response.orderGenerator.orderGeneratorId);
      setValue("departments", response.department.id?.toString());
      setValue("citiesOrigin", response.city.id);
      setValue("codeDispensaryIds", response.dispensaries);

      setDispensaries(response.dispensaries);

      //TODO: Mejorar esta validación
      if (response.serviceType.serviceId) setStratification(true);
    }

    getDepartment();
    getServiceType();
  };

  const getDepartment = async () => {
    const response = await callService(dispatch, () => getDepartmentService(), "Departamentos obtenidos", "Error al obtener departamentos");

    if (response) {
      const data = response.map((item: IDepartment) => ({
        value: item.department_id,
        label: item.department_name,
      }));
      setOptionsDepartments(data);
    }
  };

  const getCities = async () => {
    const response = await callService(dispatch, () => getCitiesService(watch().departments), "Ciudades obtenidas", "Error al obtener ciudades");

    if (response) {
      const data = response.map((item: ICities) => ({
        value: item.city_id,
        label: item.city_name,
      }));
      setOptionsCities(data);
    }
  };

  const getDispensaries = async () => {
    const response = await callService(
      dispatch,
      () => getDispensariesService(watch().citiesOrigin),
      "Puntos de origen obtenidos",
      "Error al obtener Puntos de origen"
    );

    if (response) {
      setPoints(response);
    }
  };

  const getServiceType = async () => {
    const response = await callService(dispatch, () => getServiceTypeService(), "Tipos de servicio obtenidos", "Error al obtener tipos de servicio");

    if (response) {
      const data = response.map((item: ITypeService) => ({
        value: item.service_id,
        label: item.service_name,
      }));
      setOptionsTypeService(data);
    }
  };

  const getOrderGenerator = async () => {
    const response = await callService(
      dispatch,
      () => getOrderGeneratorService(watch().typeService),
      "Generador de Pedido obtenido",
      "Error al obtener los datos generador de pedido"
    );

    if (response) {
      const data = response.map((item: IOrderGenerator) => ({
        value: item.order_generator_id,
        label: item.order_generator_name,
      }));
      setOptionsorderGeneratorIds(data);
    }
  };

  return {
    control,
    errors,
    isValid,
    optionsCities,
    optionsDepartments,
    optionsorderGeneratorIds,
    optionsTypeService,
    showModalPointsOrigen,
    stratification,
    getCities,
    getDepartment,
    getDispensaries,
    getOrderGenerator,
    getServiceType,
    getStratification,
    getValues,
    handleSubmit,
    onSubmit,
    register,
    setIsValidStep,
    setShowModalPointsOrigen,
    watch,
  };
};
