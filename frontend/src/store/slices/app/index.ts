import { createSlice } from "@reduxjs/toolkit"
import { INITIAL_PAGE, PER_PAGE, TOTAL_GISTS_COUNT } from "../../../types/common";
import { fetchGists } from "../../thunks/app";

interface IInitialState {
  page: number;
  per_page: number;
  gists: Array<any> | null;
  total_gists: number;
  client_id?: string;
  redirect_uri?: string;
}

const INITIAL_STATE: IInitialState = { 
  page: INITIAL_PAGE, 
  per_page: PER_PAGE, 
  total_gists: TOTAL_GISTS_COUNT,
  gists: null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
};

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setPage: (state, { payload }) =>{
      state.page = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchGists.fulfilled, (state, { payload }) => {
      state.gists = payload?.gists;
      state.total_gists = payload?.total_gists;
    })
  },
})

const { actions, reducer } = slice
export const { setPage } = actions

export default reducer;