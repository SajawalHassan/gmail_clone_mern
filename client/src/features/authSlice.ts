import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  user: any;
}

const initialState: initialStateTypes = {
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
