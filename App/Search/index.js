import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Component from "./Search";

// actions
import { getRepos, getUser } from "../../redux/actions/auth";
// selectors
import { repos, user } from "../../redux/selectors/auth";

//combine actions
const actions = {
  getRepos,
  getUser
};

// combine selectors
const selectors = createStructuredSelector({ repos, user });

export default compose(connect(selectors, actions))(Component);
