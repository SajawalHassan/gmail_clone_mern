import { createSlice } from "@reduxjs/toolkit";

interface intialStateTypes {
  sidebarIsOpen: boolean;
}

const initialState: intialStateTypes = {
  sidebarIsOpen: false,
};

const sidebarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {
    setSidebarIsOpen: (state, { payload }) => {
      state.sidebarIsOpen = payload;
    },
  },
});

export const { setSidebarIsOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
