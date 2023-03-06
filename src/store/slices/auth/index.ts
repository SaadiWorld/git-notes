import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
  token: string;
  user: any;
}

const INITIAL_STATE: IInitialState = { token: '', user: null }

const slice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: () => {},
})

const { actions, reducer } = slice
export const { } = actions

export default reducer;