import { IAuthState } from "../store/slices/auth";
import { VALIDATION_STATES_MOCK } from "./common";

export const AUTH_STATE_MOCK: IAuthState = {
  user: {
    login: "Saad",
    id: 12345678,
    avatar_url: "https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x",
  },
  token: "MY_TOKEN",
  validationStates: {...VALIDATION_STATES_MOCK}
}