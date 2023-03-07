import { createSlice } from "@reduxjs/toolkit"
import { fetchGists } from "../../thunks/app";

interface IInitialState {
  page: number;
  per_page: number;
  gists: Array<any> | null;
  client_id?: string;
  redirect_uri?: string;
}

const INITIAL_STATE: IInitialState = { 
  page: 2, 
  per_page: 14, 
  gists: null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
};

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