import { axiosLogisticsIntegrator } from "@/config/axiosConfig";
import keys from "./keys";

// const isTest = false;

export const getServiceTypeService = async () => {
  try {
    const route = "GetServiceType";
    const response = await axiosLogisticsIntegrator.get(`/${route}?code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getOrderGeneratorService = async (serviceTypeId: string) => {
  try {
    const route = "GetOrderGenerator";
    const response = await axiosLogisticsIntegrator.get(`/${route}?serviceTypeId=${serviceTypeId}&code=${keys[route]}`);

    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getDispensariesService = async (cityId: string) => {
  try {
   const route = "GetDispensaries";
    const response = await axiosLogisticsIntegrator.get(`/${route}?cityId=${cityId}&code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getCitiesService = async (departmentId: string) => {
  try {
    const route = "GetCities";
    const response = await axiosLogisticsIntegrator.get(`/${route}?departmentId=${departmentId}&code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getDepartmentService = async () => {
  try {
    const route = "GetDepartment";
    const response = await axiosLogisticsIntegrator.get(`/${route}?code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const createStratificationService = async (codeDispensaryIds: string[], orderGeneratorId: string, logisticOperatorId: string) => {
  try {
    const route = "CreateStratification";
    const response = await axiosLogisticsIntegrator.post(
      `/${route}?codeDispensaryIds=${codeDispensaryIds}&orderGeneratorId=${orderGeneratorId}&logisticOperatorId=${logisticOperatorId}&code=${keys[route]}`
    );
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const updateStratificationService = async (codeDispensaryIds: string[], orderGeneratorId: string, logisticOperatorId: string) => {
  try {
    const route = "UpdateStratification";
    const response = await axiosLogisticsIntegrator.put(
      `/${route}?codeDispensaryIds=${codeDispensaryIds}&orderGeneratorId=${orderGeneratorId}&logisticOperatorId=${logisticOperatorId}&code=${keys[route]}`
    );
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getSignatureOperatorService = async (operatorId: string) => {
  try {
    const route = "GetDataOperator";
    const response = await axiosLogisticsIntegrator.get(
      `/${route}?code=${keys[route]}&operatorId=${operatorId}`
    );
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getStratificationService = async (logisticOperatorId: string) => {
  try {
    const route = "GetStratification";
    const response = await axiosLogisticsIntegrator.get(`/${route}?logisticOperatorId=${logisticOperatorId}&code=${keys[route]}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};
