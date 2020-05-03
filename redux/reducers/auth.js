import { createReducer } from "../../helpers/redux";

import { GET_REPOS, GET_USER } from "../actions/auth";

const initState = {
  repos: [],
  user: null,
  error: ""
};

const handlers = {
  [GET_REPOS.REQUEST]: (state = initState) => {
    return {
      ...state,
      error: ""
    };
  },
  [GET_REPOS.SUCCESS]: (state = initState, { payload }) => {
    return {
      ...state,
      repos: payload
    };
  },
  [GET_REPOS.FAILURE]: (state = initState, { payload }) => {
    return {
      ...state,
      error: payload
    };
  },
  [GET_USER.REQUEST]: (state = initState) => {
    return {
      ...state,
      user: null
    };
  },
  [GET_USER.SUCCESS]: (state = initState, { payload }) => {
    return {
      ...state,
      user: payload
    };
  },
  [GET_USER.REQUEST]: (state = initState, { payload }) => {
    return {
      ...state,
      user: null,
      error: { ...state.error, ...payload }
    };
  }
};

export default createReducer(initState, handlers);
