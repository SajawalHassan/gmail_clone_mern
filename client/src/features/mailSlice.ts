import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  error: string;
  primaryMails: any[];
  promotionMails: any[];
  socialMails: any[];
  activeTab: string;
  isLoading: boolean;
  mailModalIsActive: boolean;
}

const initialState: initialStateTypes = {
  error: "",
  primaryMails: [],
  promotionMails: [],
  socialMails: [],
  activeTab: "primary",
  isLoading: false,
  mailModalIsActive: false,
};

const mailSlice = createSlice({
  name: "Mails",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setMails: (state, { payload }) => {
      if (state.activeTab === "primary") {
        state.primaryMails = payload;
      } else if (state.activeTab === "promotions") {
        state.promotionMails = payload;
      } else {
        state.socialMails = payload;
      }
    },
    addMail: (state, { payload }) => {
      if (state.activeTab === "primary") {
        state.primaryMails.splice(0, 0, payload);
      } else if (state.activeTab === "promotions") {
        state.promotionMails.splice(0, 0, payload);
      } else {
        state.socialMails.splice(0, 0, payload);
      }
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setMailModalIsActive: (state, { payload }) => {
      state.mailModalIsActive = payload;
    },
  },
});

export const {
  setError,
  setIsLoading,
  setMails,
  setActiveTab,
  addMail,
  setMailModalIsActive,
} = mailSlice.actions;

export default mailSlice.reducer;
