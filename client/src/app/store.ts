import authReducer from "../features/authSlice";
import socketReducer from "../features/socketSlice";
import mailsReducer from "../features/mailSlice";
import sidebarReducer from "../features/sidebarSlice";
import thunk from "redux-thunk";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  auth: authReducer,
  socket: socketReducer,
  mails: mailsReducer,
  sidebar: sidebarReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
