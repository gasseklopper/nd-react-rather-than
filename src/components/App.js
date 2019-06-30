import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import AddPoll from '../components/AddPoll'

import Login from "./Login";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import Logout from "./Logout";

class App extends Component {

  componentDidMount() {
  this.props.dispatch(handleInitialData())
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
		<Navigation/>
        <Fragment>
          <LoadingBar  />

          <div className="ui main text container" style={{ marginTop: "7em" }}>
            <Switch>
              <Route exact path="/" component={Login} />
			  <Route path="/dashboard" component={Dashboard} />
			  <Route path="/add" component={AddPoll} />
			  <Route path="/leaderboard" component={Leaderboard} />
			  <Route path="/logout" component={Logout} />
            </Switch>
          </div>
        </Fragment>
		<Footer/>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  const { authedUser } = state;
  return { authedUser };
};

export default connect(mapStateToProps)(App)
