import { Dispatch } from "redux";
import { changeStateSpinner } from "@/lib/features/common/general";
import { handleError, handleSuccess } from "@/utils/logisticsOperatorUtils";

export const callService = async <T>(dispatch: Dispatch, serviceCall: () => Promise<T>, successMessage: string, errorMessage: string): Promise<T | null> => {
  dispatch(changeStateSpinner(true));
  try {
    const response = await serviceCall();
    console.log(response);
    handleSuccess(dispatch, successMessage);
    return response;
  } catch (error) {
    console.log(error);
    handleError(dispatch, error, errorMessage);
    return null;
  } finally {
    dispatch(changeStateSpinner(false));
  }
};