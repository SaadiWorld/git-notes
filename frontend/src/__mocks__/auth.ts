import { IAuthState } from "../store/types/auth";
import { VALIDATION_STATES_MOCK } from "./common";

export const AUTH_INITIAL_STATE: IAuthState = { 
  token: '',
  user: null,
  validationStates: {
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
  }
}

export const AUTH_STATE_MOCK: IAuthState = {
  user: {
    login: "saad786",
    id: 12345678,
    avatar_url: "https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x",
    name: "Saad Salman",
    email: "saad@email.com",
    company: "Emumba",
    location: "Lahore, Pakistan",
    bio: "Software Engineer @ Emumba",
    blog: "https://www.linkedin.com/in/saadsalmannadir/",
    public_repos: 6,
    public_gists: 14,
    followers: 0,
    following: 3,
  },
  token: "MY_TOKEN",
  validationStates: {...VALIDATION_STATES_MOCK}
}