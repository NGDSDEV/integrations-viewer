/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { callService } from "@/utils/serviceHelpers";
import { ILogisticsOperator } from "@/types/logisticsOperator";
import { operatorSchema } from "@/schemas/operatorForms";
import { resetOperatorCurrent, setLogisticsOperators, setOperatorCurrent } from "@/lib/features/logisticsIntegrator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createLogisticsOperatorService,
  createSignatureService,
  getLogisticsOperatorByIdService,
  getLogisticsOperatorsService,
  getSignatureService,
  updateLogisticsOperatorService,
} from "@/services/logisticsOperatorServices";

const useLogisticsOperator = (signatureAuth: string) => {
  const [isValidOperator, setIsValidOperator] = useState(false);
  const [showModalOperator, setShowModalOperator] = useState(false);
  const operatorState = useAppSelector((state) => state.logisticsIntegrator);
  const dispatch = useAppDispatch();

  const defaultValues = {
    nit: "",
    name: "",
    codigo: "",
    estado: "",
    url: "",
    signature: "",
    signatureAuth,
    operatorId: "",
  };

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<ILogisticsOperator>({
    defaultValues,
    resolver: yupResolver(operatorSchema) as any,
  });
  const values = watch();

  const getLogisticsOperators = useCallback(async () => {
    const response = await callService(
      dispatch,
      getLogisticsOperatorsService,
      "Operadores logísticos obtenidos",
      "Error al obtener los operadores logísticos"
    );
    if (response) {
      dispatch(setLogisticsOperators(response));
    }
  }, [dispatch]);

  useEffect(() => {
    if (operatorState.operatorCurrent?.operatorId) setOperator(operatorState.operatorCurrent);
  }, [operatorState.operatorCurrent]);

  useEffect(() => {
    if (showModalOperator) getLogisticsOperators();
  }, [getLogisticsOperators, showModalOperator]);

  const handleOperatorSelect = (operator: ILogisticsOperator) => {
    setShowModalOperator(false);
    getOperator(operator.operatorId);
  };

  const getOperator = async (operatorId: string) => {
    const response = await callService(dispatch, () => getLogisticsOperatorByIdService(operatorId), "Operador obtenido", "Error al obtener operador");

    if (response) {
      setOperator(response);
      dispatch(setOperatorCurrent(response));
      setIsValidOperator(true);
      getSignature(operatorId);
    }
  };

  const setOperator = (operator?: ILogisticsOperator | null) => {
    setValue("operatorId", operator?.operatorId ?? "");
    setValue("nit", operator?.nit ?? "");
    setValue("name", operator?.name ?? "");
    setValue("codigo", operator?.codigo ?? "");
    setValue("estado", operator?.estado ?? "");
    setValue("url", operator?.url ?? "");
  };

  const getSignature = async (operatorId: string) => {
    const response = await callService(
      dispatch,
      () => getSignatureService(operatorId),
      "Firma de autenticación obtenida",
      "Error al obtener la firma de autenticación"
    );
    if (response) {
      setValue("signature", response);
    }
  };

  const resetForm = () => {
    reset(defaultValues);
    dispatch(resetOperatorCurrent());
    setIsValidOperator(false);
  };

  const saveOperator = async (operator: ILogisticsOperator) => {
    const response = await callService(
      dispatch,
      () => createLogisticsOperatorService(operator),
      "Operador registrado, Puedes crear la firma de autenticación para este operador, es opcional.",
      "Error al guardar el operador"
    );
    if (response) {
      dispatch(setOperatorCurrent({ ...operator, ...response }));
      setIsValidOperator(true);

      setOperator({ ...response });
      dispatch(setOperatorCurrent(response));
      /* TODO: Implementar toast (que se puedan crear varias instancias de toast) */
      // dispatch(showToast({ type: "success", title: "Operador registrado", description: "Puedes crear la firma de autenticación para este operador, es opcional.", time: 5000 }));
    }
  };

  const updateOperator = async (operator: ILogisticsOperator) => {
    if (!operatorState.operatorCurrent) return;

    const response = await callService(
      dispatch,
      () => updateLogisticsOperatorService(operator),
      "Operador actualizado",
      "Error al actualizar el operador"
    );

    dispatch(setOperatorCurrent({ ...operator, ...response }));
    setIsValidOperator(true);
  };

  const saveSignature = async () => {
    if (!operatorState.operatorCurrent) return;
    await callService(
      dispatch,
      () => createSignatureService(operatorState.operatorCurrent?.operatorId, signatureAuth),
      "Firma de autenticación guardada",
      "Error al guardar la firma de autenticación"
    );
  };

  const onSubmit = (data: ILogisticsOperator) => {
    if (operatorState.operatorCurrent?.operatorId) {
      updateOperator(data);
    } else {
      saveOperator(data);
    }
  };

  return {
    control,
    errors,
    isValid,
    isValidOperator,
    listOperators: operatorState.listOperators,
    showModalOperator,
    values,
    handleOperatorSelect,
    handleSubmit,
    onSubmit,
    operatorCurrent: operatorState.operatorCurrent,
    register,
    resetForm,
    saveSignature,
    setShowModalOperator,
    setValue,
    setOperator,
  };
};

export default useLogisticsOperator;
