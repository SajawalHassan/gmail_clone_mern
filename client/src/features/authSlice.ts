import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {},
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthState: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
