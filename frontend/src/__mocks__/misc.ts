import { APP_STATE_MOCK } from "./app";
import { AUTH_STATE_MOCK } from "./auth";

export const GIST_ACTIONS_MOCK_A = {
  auth: {
    ...AUTH_STATE_MOCK,
    user: {
      login: "Saad",
    },
  },
  app: {
    ...APP_STATE_MOCK,
    selectedGist: {
      id: "213431243241234321",
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Salman",
      },
    }
  }
}

export const GIST_ACTIONS_MOCK_B = {
  auth: {
    ...AUTH_STATE_MOCK,
    user: {
      login: "Saad",
    },
  },
  app: {
    ...APP_STATE_MOCK,
    selectedGist: {
      id: "213431243241234321",
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Saad",
      },
    }
  }
}

