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
    filterMails: (state: any, { payload }) => {
      state.primaryMails.splice(
        state.primaryMails.findIndex((mail: any) => mail._id !== payload)
      );
      state.promotionMails.splice(
        state.promotionMails.findIndex((mail: any) => mail._id !== payload)
      );
      state.socialMails.splice(
        state.socialMails.findIndex((mail: any) => mail._id !== payload)
      );
    },
  },
});

export const {
  setError,
  setPrimaryMails,
  setPromotionMails,
  setSocialMails,
  setIsLoading,
  filterMails,
} = mailSlice.actions;

export default mailSlice.reducer;
