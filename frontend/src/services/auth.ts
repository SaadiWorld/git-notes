import { AxiosResponse } from "axios";
import { PROXY_API } from "../api";
import { IAuthData } from "../store/types/auth";

export class AuthService {
  attemptLogin = async(code: string): Promise<AxiosResponse<IAuthData>> => {
      return await PROXY_API.post('login', { code });
  }
}