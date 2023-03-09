import { PROXY_API } from "../api";

export class AuthService {
  attemptLogin = async(code: string): Promise<any> => {
      return await PROXY_API.post('login', { code });
  }
}