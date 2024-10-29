import { axiosLogisticsIntegrator } from "@/config/axiosConfig";
import { ILogisticsOperator } from "@/types/logisticsOperator";
import keys from "./keys";

// Consumo de servicio para obtener los operadores logísticos
export const getLogisticsOperatorsService = async () => {
  try {
    const route = "GetListOperator";
    const response = await axiosLogisticsIntegrator.get<ILogisticsOperator[]>(`/${route}?code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

// Consumo de servicio para obtener un operador logístico por su ID
export const getLogisticsOperatorByIdService = async (operatorId: string) => {
  try {
    const route = "GetOperator";
    const response = await axiosLogisticsIntegrator.get<ILogisticsOperator>(`/${route}?operatorId=${operatorId}&code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

// Consumo de servicio para crear un operador logístico
export const createLogisticsOperatorService = async (data: ILogisticsOperator) => {
  try {
    const route = "CreateOperator";
    const response = await axiosLogisticsIntegrator.post<ILogisticsOperator>(
      `/${route}?operatorNit=${data.nit}&operatorName=${data.name}&estado=${data.estado}&codigo=${data.codigo}&url=${data.url}&code=${keys[route]}`,
      data.signature
    );
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

// Consumo de servicio para actualizar un operador logístico
export const updateLogisticsOperatorService = async (data: ILogisticsOperator) => {
  try {
    const route = "UpdateOperator";
    const response = await axiosLogisticsIntegrator.put<ILogisticsOperator>(
      `/${route}?operatorId=${data.operatorId}&operatorNit=${data.nit}&operatorName=${data.name}&estado=${data.estado}&codigo=${data.codigo}&url=${data.url}&code=${keys[route]}`,
      data.signature
    );
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

// Consumo de servicio para eliminar un operador logístico
export const deleteLogisticsOperatorService = async (operatorId: string) => {
  try {
    const response = await axiosLogisticsIntegrator.delete(`/DeleteOperator?operatorId=${operatorId}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

// Consumo de servicio para crear la firma de autenticación
export const createSignatureService = async (operatorId: string | undefined, signature: string) => {
  const json = JSON.parse(signature);
  try {
    const route = "CreateSignatureAuth";
    const response = await axiosLogisticsIntegrator.post(`/${route}?logisticOperatorId=${operatorId}&code=${keys[route]}`, json);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

// Consumo de servicio para obtener la firma simple
export const getSignatureService = async (operatorId: string) => {
  try {
    const route = "GetDataOperator";
    const response = await axiosLogisticsIntegrator.get(`/${route}?operatorId=${operatorId}&code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};
