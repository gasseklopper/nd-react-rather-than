import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'

//components
import AddPoll from '../components/AddPoll'
import Login from "./Login"
import Dashboard from "./Dashboard"
import Leaderboard from "./Leaderboard"
import Question from './Question/Question'

// Routing
import PrivateRoute from './PrivateRoute'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar/>
						<div>
							<Route path="/login" exact component={Login}/>
							<PrivateRoute path="/" exact component={Dashboard}/>
							<PrivateRoute path="/add" component={AddPoll}/>
							<PrivateRoute path="/leaderboard" component={Leaderboard}/>
							<PrivateRoute path="/question/:question_id" component={Question}/>
						</div>
				</Fragment>
			</Router>
		)
	}
}

function mapStateToProps({ users }) {
	return {
		users
	}
}

export default connect(mapStateToProps)(App)
