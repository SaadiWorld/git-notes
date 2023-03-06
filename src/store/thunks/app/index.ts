import { AppService } from "../../../services/app";
import { getAppPage, getAppPerPage } from "../../selectors/app";
import { createAppAsyncThunk } from "../settings";

const appService = new AppService();

export const fetchGists = createAppAsyncThunk(
  "app/fetchGists", 
  async (_, thunkAPI) => {
    try {
      const page = getAppPage(thunkAPI.getState());
      const per_page = getAppPerPage(thunkAPI.getState());
      const { data } = await appService.fetchGists({ page, per_page });
      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      console.error(error);
    }
});
