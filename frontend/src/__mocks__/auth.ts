import { IAuthState } from "../store/slices/auth";

export const AUTH_STATE_MOCK: IAuthState = {
  user: {
    login: "DummyUser",
    id: 12345678,
    node_id: "MDQ6VXNlcjQ3NDQ4MTQ0",
    avatar_url: "https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x",
    gravatar_id: "",
    url: "https://api.github.com/users/DummyUser",
    html_url: "https://github.com/DummyUser",
    followers_url: "https://api.github.com/users/DummyUser/followers",
    following_url: "https://api.github.com/users/DummyUser/following{/other_user}",
    gists_url: "https://api.github.com/users/DummyUser/gists{/gist_id}",
    starred_url: "https://api.github.com/users/DummyUser/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/DummyUser/subscriptions",
    organizations_url: "https://api.github.com/users/DummyUser/orgs",
    repos_url: "https://api.github.com/users/DummyUser/repos",
    events_url: "https://api.github.com/users/DummyUser/events{/privacy}",
    received_events_url: "https://api.github.com/users/DummyUser/received_events",
    type: "User",
    site_admin: false,
    name: "Dummy User",
    company: "apple",
    blog: "https://www.linkedin.com/",
    location: "Lahore, Pakistan",
    email: null,
    hireable: null,
    bio: "Software Engineer",
    twitter_username: null,
    public_repos: 6,
    public_gists: 15,
    followers: 0,
    following: 3,
    created_at: "2019-02-08T10:47:40Z",
    updated_at: "2023-03-16T07:11:32Z"
  },
  token: " ",
  validationStates: {
    message: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
  }
}