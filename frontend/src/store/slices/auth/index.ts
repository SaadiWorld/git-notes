import { createSlice } from "@reduxjs/toolkit"
import { attemptLogin } from "../../thunks/auth";

interface IInitialState {
  token: string;
  user: any;
}

const INITIAL_STATE: IInitialState = { token: '', user: null }

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
    builder.addCase(attemptLogin.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    })
  },
})

const { actions, reducer } = slice
export const { setAuthData, resetAuthData } = actions

export default reducer;