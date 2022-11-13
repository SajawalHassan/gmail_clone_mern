import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  socket: null,
};

const socketSlice = createSlice({
  name: "Socket",
  initialState,
  reducers: {
    setSocket: (state, { payload }) => {
      state.socket = payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
