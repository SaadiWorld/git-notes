import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "./index";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();