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
  starGist = async (gistId: string): Promise<any> =>{
    return await GITHUB_API.put(`gists/${gistId}/star`);
  }
  unstarGist = async (gistId: string): Promise<any> =>{
    return await GITHUB_API.delete(`gists/${gistId}/star`);
  }
  checkStarStatus = async (gistId: string): Promise<any> =>{
    return await GITHUB_API.get(`gists/${gistId}/star`);
  }
  forkGist = async (gistId: string): Promise<any> =>{
    return await GITHUB_API.post(`gists/${gistId}/forks`);
  }
}