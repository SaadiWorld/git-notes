import { AxiosResponse } from "axios";
import { GITHUB_API } from "../api";
import { IGist, IFiles, IContent } from "../store/types/app";

interface IFetchGists {
  page?: number;
  per_page?: number;
}

export interface ICreateGistRequest {
  description?: string;
  public: boolean;
  files: IFiles;
}

export class AppService {
  fetchPublicGists = async (queryParams: IFetchGists): Promise<AxiosResponse<IGist[]>> => {
    return await GITHUB_API.get('gists/public', { params: queryParams });
  }
  fetchUserGists = async (queryParams: IFetchGists): Promise<AxiosResponse<IGist[]>> => {
    return await GITHUB_API.get('gists', { params: queryParams });
  }
  fetchUserStarredGists = async (): Promise<AxiosResponse<IGist[]>> => {
    return await GITHUB_API.get('gists/starred');
  }
  fetchSingleGist = async (gistId: string): Promise<AxiosResponse<IGist>> => {
    return await GITHUB_API.get(`gists/${gistId}`);
  }
  starGist = async (gistId: string): Promise<AxiosResponse<string>> =>{
    return await GITHUB_API.put(`gists/${gistId}/star`);
  }
  unstarGist = async (gistId: string): Promise<AxiosResponse<string>> =>{
    return await GITHUB_API.delete(`gists/${gistId}/star`);
  }
  checkStarStatus = async (gistId: string): Promise<AxiosResponse<string>> =>{
    return await GITHUB_API.get(`gists/${gistId}/star`);
  }
  forkGist = async (gistId: string): Promise<AxiosResponse<IGist>> =>{
    return await GITHUB_API.post(`gists/${gistId}/forks`);
  }
  deleteGist = async (gistId: string): Promise<AxiosResponse<string>> =>{
    return await GITHUB_API.delete(`gists/${gistId}`);
  }
  createGist = async (payload: ICreateGistRequest): Promise<AxiosResponse<IGist>> =>{
    return await GITHUB_API.post('gists', payload);
  }
  updateGist = async (payload: ICreateGistRequest, gistId: string): Promise<AxiosResponse<IGist>> =>{
    return await GITHUB_API.patch(`gists/${gistId}`, {
      gist_id: gistId,
      ...payload
    });
  }
}