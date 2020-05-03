import { createAsyncAction } from "../../helpers/redux";
import { apiCall } from "./api";

export const GET_USER = createAsyncAction("GET_USER")
export const getUser = username => {
  return apiCall({
    types: GET_USER,
    method: "GET",
    endpoint: `/users/${username}`,
    headers: {
      Accept: "application/vnd.github.v3+json"
    }
  })
}

export const GET_REPOS = createAsyncAction("GET_REPOS");
export const getRepos = (username, currentPage, perPage) => {
  return apiCall({
    types: GET_REPOS,
    method: "GET",
    endpoint: `/users/${username}/repos?type=public&page=${currentPage}&per_page=${perPage}`,
    headers: {
      Accept: "application/vnd.github.v3+json"
    }
  });
};
