import { GITHUB_API } from "../api";

export class AppService {
  fetchGists = async(queryParams: any): Promise<any> => {
    try {
      const response = await GITHUB_API.get('gists', { params: queryParams });
      return response
    } catch (error) {
        throw error;
    }
  }
}