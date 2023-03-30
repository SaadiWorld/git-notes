import { IAppState } from "../store/slices/app";
import { GIST_VIEW, INITIAL_PAGE, PER_PAGE, TOTAL_GISTS_COUNT } from "../types/common";
import { VALIDATION_STATES_MOCK } from "./common";

export const APP_STATE_MOCK: IAppState = {
  page: INITIAL_PAGE, 
  per_page: PER_PAGE, 
  total_gists: TOTAL_GISTS_COUNT,
  gist_view: GIST_VIEW.LIST,
  gists: [],
  selectedGist: {
    id: "213431243241234321",
    files: {},
    updated_at: "2023-03-30T06:03:44Z",
    owner: {
      login: "Taha",
      id: 87654321,
      avatar_url: "https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x",
    },
  },
  client_id: "MY_CLIENT_ID",
  redirect_uri: "http://localhost:3000/login",
  validationStates: {...VALIDATION_STATES_MOCK}
}