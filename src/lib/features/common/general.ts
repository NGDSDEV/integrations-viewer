import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSpinner: false,
  showSideMenu: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeStateSideMenu: (state, action) => {
      state.showSideMenu = action.payload;
    },
    changeStateSpinner: (state, action) => {
      state.showSpinner = action.payload;
    },
  },
});

export const { changeStateSideMenu, changeStateSpinner } = generalSlice.actions;

export default generalSlice.reducer;
