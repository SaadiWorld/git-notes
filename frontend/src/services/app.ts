import { GITHUB_API } from "../api";

export class AppService {
  fetchPublicGists = async(queryParams: any): Promise<any> => {
    try {
      const response = await GITHUB_API.get('gists/public', { params: queryParams });
      return response
    } catch (error) {
        throw error;
    }
  }
  fetchUserGists = async(queryParams: any): Promise<any> => {
    try {
      const response = await GITHUB_API.get('gists', { params: queryParams });
      return response
    } catch (error) {
        throw error;
    }
  }
}