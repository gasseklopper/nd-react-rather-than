import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";

import Login from "./Login";
import Dashboard from "./Dashboard";

class App extends Component {

  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  render() {
    const { authedUser } = this.props;
	console.log('authedUser: ', authedUser)

    if (!authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar  />

          <div className="ui main text container" style={{ marginTop: "7em" }}>
            <Switch>
              <Route exact path="/" component={Login} />
			  <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  const { authedUser } = state;
  return { authedUser };
};

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
