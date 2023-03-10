import { AxiosError } from "axios";
import { AppService } from "../../../services/app";
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