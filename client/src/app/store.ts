import authReducer from "../features/authSlice";
import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
