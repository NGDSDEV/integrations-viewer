import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { callService } from "@/utils/serviceHelpers";
import { createParametryService, getParametryService } from "@/services/parametryServices";
import { getSignatureOperatorService } from "@/services/stratificationServices";

export const useParametry = (jsonCheck: object, showModal: () => void) => {
  const dispatch = useAppDispatch();
  const operatorState = useAppSelector((state) => state.logisticsIntegrator);

  const clearValues = (obj: any): void => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (typeof obj[prop] === "object" && obj[prop] !== null) {
          clearValues(obj[prop]);
        } else {
          obj[prop] = "";
        }
      }
    }
  };

  function hasValue(obj: any): boolean {
    if (obj === null || obj === undefined) return false;

    if (typeof obj === "object") {
      return hasValueInObject(obj);
    } else if (Array.isArray(obj)) {
      return hasValueInArray(obj);
    } else {
      return obj !== "";
    }
  }

  function hasValueInObject(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (hasValue(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  function hasValueInArray(arr: any[]): boolean {
    for (const item of arr) {
      if (hasValue(item)) {
        return true;
      }
    }
    return false;
  }

  const createParametry = async () => {
    await callService(
      dispatch,
      () => createParametryService(operatorState.operatorCurrent?.operatorId ?? "", jsonCheck),
      "Parametrización creada",
      "Error al registrar los datos de Parametrización"
    );

    showModal();
  };

  const getSignature = async () => {
    if (!operatorState.operatorCurrent) return;

    const response = await callService(
      dispatch,
      () => getSignatureOperatorService(operatorState.operatorCurrent?.operatorId ?? ""),
      "Firma obtenida",
      "Error obtener firma"
    );
    console.log("💠  response--> ", response)

    return response;
  };

  const getParametry = async () => {
    if (!operatorState.operatorCurrent) return;

    const response = await callService(
      dispatch,
      () => getParametryService(operatorState.operatorCurrent?.operatorId ?? ""),
      "Datos de parametrización obtenidos",
      "Error al obtener datos de parametrización"
    );

    return response;
  };

  return { createParametry, clearValues, hasValue, getSignature, getParametry };
};
