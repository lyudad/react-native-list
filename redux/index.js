import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import apiMiddleware from "./middleware/api";

import reducer from "./reducers/index";

export const configureStore = () => {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(apiMiddleware))
  );
};

const store = configureStore();

export default store;
