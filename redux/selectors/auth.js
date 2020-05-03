import { createSelector } from "reselect";

const getReducer = store => store.auth;

export const repos = createSelector(getReducer, data => data.repos);

export const user = createSelector(getReducer, data => data.user);
