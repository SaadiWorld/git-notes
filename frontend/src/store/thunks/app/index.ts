import { AxiosError } from "axios";
import { AppService, ICreateGistRequest } from "../../../services/app";
import { IResponseData, prepareErrorResponseMessage } from "../helpers";
import { GIST_TYPE, TOTAL_GISTS_COUNT } from "../../../types/common";
import { getAppPerPage } from "../../selectors/app";
import { getUserTotalGistsCount } from "../../selectors/auth";
import { createAppAsyncThunk } from "../settings";

const appService = new AppService();

interface IFetchGists {
  gistType: GIST_TYPE;
  page?: number;
}

interface IStarGists {
  selectedGistId: string;
  shouldStarGist: boolean;
}

interface IUpdateGist {
  payload: ICreateGistRequest;
  gistId: string;
}

export const fetchGists = createAppAsyncThunk(
  "app/fetchGists", 
  async ({ gistType, page }: IFetchGists, thunkAPI) => {
    try {
      const per_page = getAppPerPage(thunkAPI.getState());
      const isUserGists = gistType === GIST_TYPE.USER;
      const isUserStarredGists = gistType === GIST_TYPE.STARRED;
      const { data } = isUserGists ?
        await appService.fetchUserGists({ page, per_page }) :
        isUserStarredGists ?
        await appService.fetchUserStarredGists() :
        await appService.fetchPublicGists({ page, per_page });
      const userGistsCount = getUserTotalGistsCount(thunkAPI.getState());
      return thunkAPI.fulfillWithValue({ gists: data, total_gists: isUserGists ? userGistsCount: isUserStarredGists ? 0 : TOTAL_GISTS_COUNT })
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const fetchSingleGist = createAppAsyncThunk(
  "app/fetchSingleGist", 
  async (gist_id: string, thunkAPI) => {
    try {
      const { data } = await appService.fetchSingleGist(gist_id);
      return thunkAPI.fulfillWithValue({ selectedGist: data })
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const starGist = createAppAsyncThunk(
  "app/starGist", 
  async ({ selectedGistId, shouldStarGist }: IStarGists, thunkAPI) => {
    try {
      const { status } = shouldStarGist ? await appService.starGist(selectedGistId) : await appService.unstarGist(selectedGistId);
      const newStarStatus = status === 204 && shouldStarGist;
      return thunkAPI.fulfillWithValue(newStarStatus);
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const checkStarStatus = createAppAsyncThunk(
  "app/checkStarStatus", 
  async (gist_id: string, thunkAPI) => {
    try {
      const { status } = await appService.checkStarStatus(gist_id);
      const isStarred = status === 204;
      return thunkAPI.fulfillWithValue(isStarred);
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const forkGist = createAppAsyncThunk(
  "app/forkGist", 
  async (selectedGistId: string, thunkAPI) => {
    try {
      const { data: { id } } = await appService.forkGist(selectedGistId);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const deleteGist = createAppAsyncThunk(
  "app/deleteGist", 
  async (selectedGistId: string, thunkAPI) => {
    try {
      const { status } = await appService.deleteGist(selectedGistId);
      return thunkAPI.fulfillWithValue(status === 204);
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const createGist = createAppAsyncThunk(
  "app/createGist", 
  async (payload: ICreateGistRequest, thunkAPI) => {
    try {
      const { status } = await appService.createGist(payload);
      return thunkAPI.fulfillWithValue(status === 201);
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});

export const updateGist = createAppAsyncThunk(
  "app/updateGist", 
  async ({ payload, gistId }: IUpdateGist, thunkAPI) => {
    try {
      const { status } = await appService.updateGist(payload, gistId);
      return thunkAPI.fulfillWithValue(status === 200);
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});