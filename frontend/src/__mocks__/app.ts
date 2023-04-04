import { IAppState } from "../store/slices/app";
import { GIST_VIEW, INITIAL_PAGE, PER_PAGE, TOTAL_GISTS_COUNT } from "../types/common";
import { GISTS, VALIDATION_STATES_MOCK } from "./common";

export const APP_STATE_MOCK: IAppState = {
  page: INITIAL_PAGE, 
  per_page: PER_PAGE, 
  total_gists: TOTAL_GISTS_COUNT,
  gist_view: GIST_VIEW.LIST,
  gists: GISTS,
  selectedGist: GISTS[0],
  client_id: "MY_CLIENT_ID",
  redirect_uri: "http://localhost:3000/login",
  validationStates: {...VALIDATION_STATES_MOCK}
}