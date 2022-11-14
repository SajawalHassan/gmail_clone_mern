import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  error: "",
};

const mailSlice = createSlice({
  name: "Mails",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setError } = mailSlice.actions;

export default mailSlice.reducer;
