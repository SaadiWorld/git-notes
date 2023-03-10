export enum GIST_TYPE {
  USER = 'user',
  PUBLIC= 'public',
  STARRED= 'starred',
}

export enum GIST_VIEW {
  GRID = 'grid',
  LIST= 'list',
}

export enum GIST_ACTIONS {
  STAR = 'star',
  FORK = 'fork',
  EDIT = 'edit',
  DELETE = 'delete',
}

export const INITIAL_PAGE = 1;
export const PER_PAGE = 12;
export const TOTAL_GISTS_COUNT = 3000;