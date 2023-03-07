import { AppService } from "../../../services/app";
import { GIST_TYPE } from "../../../types/coomon";
import { getAppPage, getAppPerPage } from "../../selectors/app";
import { getToken } from "../../selectors/auth";
import { createAppAsyncThunk } from "../settings";

const appService = new AppService();

export const fetchGists = createAppAsyncThunk(
  "app/fetchGists", 
  async (gistType: GIST_TYPE, thunkAPI) => {
    try {
      const page = getAppPage(thunkAPI.getState());
      const per_page = getAppPerPage(thunkAPI.getState());
      const token = getToken(thunkAPI.getState());
      const { data } = token && gistType === GIST_TYPE.USER ?
        await appService.fetchUserGists({ page, per_page }) :
        await appService.fetchPublicGists({ page, per_page });
      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      console.error(error);
    }
});
