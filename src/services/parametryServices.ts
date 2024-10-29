import { axiosLogisticsIntegrator } from "@/config/axiosConfig";
import keys from "./keys";

const isTest = false;

export const createParametryService = async (operatorId: string, signature: object) => {
  try {
    const route = "CreateParametry";
    const response = await axiosLogisticsIntegrator.post(`/${route}?code=${keys[route]}&operatorId=${operatorId}`, signature);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};

export const getParametryService = async (operatorId: string) => {
  try {
    const route = "GetParametry";
    const response = await axiosLogisticsIntegrator.get(`/${route}?code=${keys[route]}&operatorId=${operatorId}`);
    return response.data;
  } catch (error) {
    console.log("💠  error--> ", error);
    throw error;
  }
};