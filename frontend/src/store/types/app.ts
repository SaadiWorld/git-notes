import { GIST_VIEW } from "../../types/common";

// APP STATE
export interface IAppState {
  page: number;
  per_page: number;
  total_gists: number;
  gist_view: GIST_VIEW;
  gists: Array<IGist> | null;
  selectedGist: IGist | null;
  client_id?: string;
  redirect_uri?: string;
  validationStates: {
    message?: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
}


// OTHERS
export interface IGist {
  url?: string
  forks_url?: string
  commits_url?: string
  id: string
  node_id?: string
  git_pull_url?: string
  git_push_url?: string
  html_url?: string
  files: IFiles
  public?: boolean
  created_at?: string
  updated_at: string
  description?: string
  comments?: number
  user?: IUser | null
  comments_url?: string
  owner: IUser
  fork_of?: IForkOf
  forks?: IFork[]
  history?: History[]
  truncated?: boolean
  // Local properties
  isStarred?: boolean;
  forkedGistId?: string;
}

export interface IFiles {
  [key: string]: IContent | null
}

export interface IContent {
  name?: string
  filename?: string
  content: string
  type?: string
  language?: any
  raw_url?: string
  size?: number
  truncated?: boolean
}

export interface IForkOf {
  url: string
  forks_url: string
  commits_url: string
  id: string
  node_id: string
  git_pull_url: string
  git_push_url: string
  html_url: string
  files: IFiles
  public: boolean
  created_at: string
  updated_at: string
  description: string
  comments: number
  user: any
  comments_url: string
  owner: IUser
}

export interface IFork {
  url: string
  user: IUser
  id: string
  created_at: string
  updated_at: string
}

export interface IHistory {
  user: IUser
  version: string
  committed_at: string
  change_status: ChangeStatus
  url: string
}

export interface IUser {
  login: string
  id: number
  node_id?: string
  avatar_url: string
  gravatar_id?: string
  url?: string
  html_url?: string
  followers_url?: string
  following_url?: string
  gists_url?: string
  starred_url?: string
  subscriptions_url?: string
  organizations_url?: string
  repos_url?: string
  events_url?: string
  received_events_url?: string
  type?: string
  site_admin?: boolean
}

export interface ChangeStatus {
  total: number
  additions: number
  deletions: number
}
