import { changeStateSpinner } from "@/lib/features/common/general";
import { Dispatch } from "redux";
import { showToast } from "@/lib/features/common/toast";

export const handleError = (dispatch: Dispatch, error: unknown, message: string) => {
  console.error(message, error);
  dispatch(showToast({ type: "error", title: "Error", description: message }));
  dispatch(changeStateSpinner(false));
};

export const handleSuccess = (dispatch: Dispatch, message: string, description: string = "") => {
  dispatch(showToast({ type: "success", title: message, description }));
  dispatch(changeStateSpinner(false));
};