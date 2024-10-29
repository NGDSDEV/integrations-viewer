import { ILogisticsOperator } from "@/types/logisticsOperator";
import { createSlice } from "@reduxjs/toolkit";

interface LogisticsIntegratorState {
  listOperators: ILogisticsOperator[];
  operatorCurrent: ILogisticsOperator | null;
}

const initialState: LogisticsIntegratorState = {
  listOperators: [],
  operatorCurrent: null,
};

const logisticsIntegratorSlice = createSlice({
  name: "logisticsIntegrator",
  initialState,
  reducers: {
    setLogisticsOperators: (state, action) => {
      state.listOperators = action.payload;
    },
    setOperatorCurrent: (state, action) => {
      state.operatorCurrent = action.payload;
    },
    resetOperatorCurrent: (state) => {
      state.operatorCurrent = null;
    },
    resetLogisticsOperators: (state) => {
      state.listOperators = [];
    },
  },
});

export const { setLogisticsOperators, setOperatorCurrent, resetOperatorCurrent, resetLogisticsOperators } = logisticsIntegratorSlice.actions;

export default logisticsIntegratorSlice.reducer;
