import { createSlice } from "@reduxjs/toolkit"
import { AUTH_INITIAL_STATE } from "../../../__mocks__/auth";
import { attemptLogin } from "../../thunks/auth";

const INITIAL_STATE = AUTH_INITIAL_STATE;

const slice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setAuthData: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    resetAuthData: () => INITIAL_STATE
  },
  extraReducers: builder => {
    builder.addCase(attemptLogin.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(attemptLogin.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.validationStates.isSuccess = true;
      state.validationStates.isError = false;
      state.user = payload.user;
      state.token = payload.token;
    })
    builder.addCase(attemptLogin.rejected, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.validationStates.isSuccess = false;
      state.validationStates.isError = true;
      state.validationStates.message = payload;
    })
  },
})

const { actions, reducer } = slice
export const { setAuthData, resetAuthData } = actions

export default reducer;