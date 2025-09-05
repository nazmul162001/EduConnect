import { combineReducers } from "@reduxjs/toolkit";
import admissionReducer from "../features/admission/admissionSlice";
import authReducer from "../features/auth/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  admission: admissionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
