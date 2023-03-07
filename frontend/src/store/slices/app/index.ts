import { createSlice } from "@reduxjs/toolkit"
import { fetchGists } from "../../thunks/app";

interface IInitialState {
  page: number;
  per_page: number;
  gists: Array<any> | null;
}

const INITIAL_STATE: IInitialState = { page: 2, per_page: 14, gists: null };

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGists.fulfilled, (state, { payload }) => {
      state.gists = payload;
    })
  },
})

const { actions, reducer } = slice
export const { } = actions

export default reducer;