import API from "../api";

export class AppService {
  fetchGists = async(queryParams: any): Promise<any> => {
    try {
      const response = await API.get('/gists', { params: queryParams });
      return response
    } catch (error) {
        throw error;
    }
  }
}