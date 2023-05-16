import { createSlice } from "@reduxjs/toolkit"
import { APP_INITIAL_STATE } from "../../../__mocks__/app";
import { checkStarStatus, createGist, deleteGist, fetchGists, fetchSingleGist, forkGist, starGist, updateGist } from "../../thunks/app";

export const INITIAL_STATE = APP_INITIAL_STATE

export const slice = createSlice({
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
      state.validationStates.message = '';
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
      if (state.selectedGist) {
        state.selectedGist.isStarred = payload;
      }
    })
    builder.addCase(starGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(starGist.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      if (state.selectedGist) {
        state.selectedGist.isStarred = payload;
      }
    })
    builder.addCase(starGist.rejected, (state, { payload }) => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(forkGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(forkGist.fulfilled, (state, { payload }) => {
      state.validationStates.isLoading = false;
      if (state.selectedGist) {
        state.selectedGist.forkedGistId = payload;
      }
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
    builder.addCase(createGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(createGist.fulfilled, state => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(createGist.rejected, state => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(updateGist.pending, state => {
      state.validationStates.isLoading = true;
    })
    builder.addCase(updateGist.fulfilled, state => {
      state.validationStates.isLoading = false;
    })
    builder.addCase(updateGist.rejected, state => {
      state.validationStates.isLoading = false;
    })
  },
})

const { actions, reducer } = slice
export const { setPage, setGistView, resetSelectedGist } = actions

export default reducer;