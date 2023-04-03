import { APP_STATE_MOCK } from "./app";
import { AUTH_STATE_MOCK } from "./auth";

export const SELECTED_GIST_ID_A = '213431243241234321';
export const SELECTED_GIST_ID_B = '241234321213431243';
export const FORKED_GIST_ID = '321213431243241234';

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
      id: SELECTED_GIST_ID_A,
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
      id: SELECTED_GIST_ID_B,
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Saad",
      },
    }
  }
}

export const STAR_MOCK_A = {
  auth: {
    ...AUTH_STATE_MOCK,
    user: {
      login: "Saad",
    },
  },
  app: {
    ...APP_STATE_MOCK,
    selectedGist: {
      id: SELECTED_GIST_ID_A,
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Salman",
      },
      isStarred: false
    }
  }
}

export const STAR_MOCK_B = {
  auth: {
    ...AUTH_STATE_MOCK,
    user: {
      login: "Taha",
    },
  },
  app: {
    ...APP_STATE_MOCK,
    selectedGist: {
      id: SELECTED_GIST_ID_B,
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Salman",
      },
      isStarred: true
    }
  }
}

export const FORK_MOCK_A = {
  auth: {
    ...AUTH_STATE_MOCK,
    user: {
      login: "Saad",
    },
  },
  app: {
    ...APP_STATE_MOCK,
    selectedGist: {
      id: SELECTED_GIST_ID_A,
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Salman",
      },
      forks: [{
        user: {
          login: "Saad",
        }
      }]
    }
  }
}

export const FORK_MOCK_B = {
  auth: {
    ...AUTH_STATE_MOCK,
    user: {
      login: "Saad",
    },
  },
  app: {
    ...APP_STATE_MOCK,
    selectedGist: {
      id: SELECTED_GIST_ID_B,
      files: {},
      updated_at: "2023-03-30T06:03:44Z",
      owner: {
        login: "Salman",
      },
      forks: [{
        user: {
          login: "Taha",
        }
      }]
    }
  }
}