import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const initialState = {
  auth: null,
};

export const authReducer = createSlice({
  name: "authstore",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
    Logout: (state) => {
      state.auth = null;
    },
  },
});

export const { login, Logout } = authReducer.actions;
export default authReducer.reducer;
