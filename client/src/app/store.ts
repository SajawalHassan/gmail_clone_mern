import authReducer from "../features/authSlice";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
