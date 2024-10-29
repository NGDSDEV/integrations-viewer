import { createSlice } from "@reduxjs/toolkit";
import { IGroupInfo } from "@/types/auth";

interface AuthState {
  userInfo: IGroupInfo | null;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { changeUserInfo, resetUserInfo } = authSlice.actions;

export default authSlice.reducer;
