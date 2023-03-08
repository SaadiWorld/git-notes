import { AppService } from "../../../services/app";
import { GIST_TYPE, TOTAL_GISTS_COUNT } from "../../../types/common";
import { getAppPerPage } from "../../selectors/app";
import { getToken, getUserTotalGistsCount } from "../../selectors/auth";
import { createAppAsyncThunk } from "../settings";

const appService = new AppService();

interface IFetchGists {
  gistType: GIST_TYPE;
  page: number;
}

export const fetchGists = createAppAsyncThunk(
  "app/fetchGists", 
  async ({ gistType, page }: IFetchGists, thunkAPI) => {
    try {
      const per_page = getAppPerPage(thunkAPI.getState());
      const token = getToken(thunkAPI.getState());
      const isUserGists = token && gistType === GIST_TYPE.USER;
      const { data } = isUserGists ?
        await appService.fetchUserGists({ page, per_page }) :
        await appService.fetchPublicGists({ page, per_page });
      const userGistsCount = getUserTotalGistsCount(thunkAPI.getState());
      return thunkAPI.fulfillWithValue({ gists: data, total_gists: isUserGists ? userGistsCount: TOTAL_GISTS_COUNT })
    } catch (error) {
      console.error(error);
    }
});
