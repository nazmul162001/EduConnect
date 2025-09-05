import { combineReducers } from "@reduxjs/toolkit";
import admissionReducer from "../features/admission/admissionSlice";

const rootReducer = combineReducers({
  admission: admissionReducer,
});

export default rootReducer;
