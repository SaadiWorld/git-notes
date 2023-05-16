import { AxiosError } from "axios";
import { AuthService } from "../../../services/auth";
import { createAppAsyncThunk } from "../../appAsyncThunk";
import { IResponseData, prepareErrorResponseMessage } from "../helpers";

const authService = new AuthService();

export const attemptLogin = createAppAsyncThunk(
  "auth/login", 
  async (code: string, thunkAPI) => {
    try {
      const { data } = await authService.attemptLogin(code);
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(prepareErrorResponseMessage(error as AxiosError<IResponseData>))
    }
});
