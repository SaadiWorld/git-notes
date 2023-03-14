import { createSlice } from "@reduxjs/toolkit"
import { GIST_VIEW, INITIAL_PAGE, PER_PAGE, TOTAL_GISTS_COUNT } from "../../../types/common";
import { checkStarStatus, deleteGist, fetchGists, fetchSingleGist, forkGist, starGist } from "../../thunks/app";

interface IInitialState {
  page: number;
  per_page: number;
  total_gists: number;
  gist_view: GIST_VIEW;
  gists: Array<any> | null;
  selectedGist: any; // TODO: Adding proper type for the gist object
  client_id?: string;
  redirect_uri?: string;
  validationStates: {
    message?: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
}

const INITIAL_STATE: IInitialState = { 
  page: INITIAL_PAGE, 
  per_page: PER_PAGE, 
  total_gists: TOTAL_GISTS_COUNT,
  gist_view: GIST_VIEW.LIST,
  gists: null,
  selectedGist: null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  validationStates: {
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
  }
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
    },
    resetSelectedGist: state => {
      state.selectedGist = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchGists.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(fetchGists.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.validationStates.isSuccess = true;
      state.validationStates.isError = false;
      state.gists = payload?.gists;
      state.total_gists = payload?.total_gists;

    })
    builder.addCase(fetchGists.rejected, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.validationStates.isSuccess = false;
      state.validationStates.isError = true;
      state.validationStates.message = payload;
    })
    builder.addCase(fetchSingleGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(fetchSingleGist.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.validationStates.isSuccess = true;
      state.validationStates.isError = false;
      state.selectedGist = payload?.selectedGist;
    })
    builder.addCase(fetchSingleGist.rejected, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.validationStates.isSuccess = false;
      state.validationStates.isError = true;
      state.validationStates.message = payload;
      state.selectedGist = null;
    })
    builder.addCase(checkStarStatus.fulfilled, (state, { payload }) => {
      state.selectedGist.isStarred = payload;
    })
    builder.addCase(starGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(starGist.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.selectedGist.isStarred = payload;
    })
    builder.addCase(starGist.rejected, (state, { payload }) => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(forkGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(forkGist.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      state.selectedGist.forkedGistId = payload;
    })
    builder.addCase(forkGist.rejected, state => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(deleteGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(deleteGist.fulfilled, state => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(deleteGist.rejected, state => {
      state.validationStates.isLoading = false;
    })
  },
})

const { actions, reducer } = slice
export const { setPage, setGistView, resetSelectedGist } = actions

export default reducer;