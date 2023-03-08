import { createSlice } from "@reduxjs/toolkit"
import { GIST_VIEW, INITIAL_PAGE, PER_PAGE, TOTAL_GISTS_COUNT } from "../../../types/common";
import { fetchGists } from "../../thunks/app";

interface IInitialState {
  page: number;
  per_page: number;
  total_gists: number;
  gist_view: GIST_VIEW;
  gists: Array<any> | null;
  client_id?: string;
  redirect_uri?: string;
}

const INITIAL_STATE: IInitialState = { 
  page: INITIAL_PAGE, 
  per_page: PER_PAGE, 
  total_gists: TOTAL_GISTS_COUNT,
  gist_view: GIST_VIEW.LIST,
  gists: null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
};

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setGistView: (state, { payload }) => {
      state.gist_view = payload;
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
export const { setPage, setGistView } = actions

export default reducer;