import { PROXY_API } from "../api";

export class AuthService {
  attemptLogin = async(code: string): Promise<any> => {
    try {
      const response = await PROXY_API.post('login', { code });
      return response
    } catch (error) {
        throw error;
    }
  }
}