import { GITHUB_API } from "../api";

export class AppService {
  fetchPublicGists = async (queryParams: any): Promise<any> => {
    return await GITHUB_API.get('gists/public', { params: queryParams });
  }
  fetchUserGists = async (queryParams: any): Promise<any> => {
    return await GITHUB_API.get('gists', { params: queryParams });
  }
  fetchUserStarredGists = async (): Promise<any> => {
    return await GITHUB_API.get('gists/starred');
  }
  fetchSingleGist = async (gistId: string): Promise<any> => {
    return await GITHUB_API.get(`gists/${gistId}`);
  }
}