import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IToast {
  type: "success" | "error" | "info" | "warning";
  title: string;
  visible: boolean;
  description?: string;
  time?: number;
}

const initialState: IToast = {
  type: "success",
  title: "",
  description: "",
  visible: false,
  time: 3000,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<IToast, "visible">>) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.visible = true;
      state.time = action.payload.time ?? initialState.time;
    },
    hideToast: (state) => {
      state.type = initialState.type;
      state.title = initialState.title;
      state.description = initialState.description;
      state.visible = initialState.visible;
      state.time = initialState.time;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
