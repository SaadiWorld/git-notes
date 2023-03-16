import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./app";
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer
})

export default rootReducer; 