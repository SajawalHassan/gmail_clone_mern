import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  error: "",
  primaryMails: [],
  promotionMails: [],
  socialMails: [],
  isLoading: false,
};

const mailSlice = createSlice({
  name: "Mails",
  initialState,
  reducers: {
    setError: (state: any, { payload }) => {
      state.error = payload;
    },
    setPrimaryMails: (state: any, { payload }) => {
      state.primaryMails = payload;
    },
    setPromotionMails: (state: any, { payload }) => {
      state.promotionMails = payload;
    },
    setSocialMails: (state: any, { payload }) => {
      state.socialMails = payload;
    },
    setIsLoading: (state: any, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const {
  setError,
  setPrimaryMails,
  setPromotionMails,
  setSocialMails,
  setIsLoading,
} = mailSlice.actions;

export default mailSlice.reducer;
