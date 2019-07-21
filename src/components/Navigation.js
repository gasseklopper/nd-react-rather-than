import React, { Component } from 'react'
import { NavLink, Redirect } from "react-router-dom"
import { Menu, Label } from 'semantic-ui-react'
import { connect } from "react-redux"
import {logOut} from "../actions/authedUser"

 class Navigation extends Component {
	state = {
		redirectLogin: false
	}

	 handleLogOut = (e) => {
		e.preventDefault()
		this.props.dispatch(logOut())
		this.setState(() => ({
			redirectLogin: true
		}))
	}

	render() {
	const { users, authedUser } = this.props;
	const { name, avatarURL } = users[authedUser];

		const {redirectLogin} = this.state

		if (redirectLogin === true) {
			return (<Redirect to="/login"/>)
		}

		return (
			<Menu>
				<NavLink to="/" exact className="item" activeClassName="active">
					Home
				</NavLink>
				<NavLink to="/add" exact className="item" activeClassName="active">
					Add Questions
				</NavLink>
				<NavLink to="/leaderboard" exact className="item" activeClassName="active">
					Leader Board
				</NavLink>
				<Menu.Menu position='right'>
					<Menu.Item>
						<div>
							<Label image>
								<img alt='' src={avatarURL} />
									{name}
							</Label>
						</div>
					</Menu.Item>
				 <NavLink to="#" className="item" onClick={this.handleLogOut}>Logout</NavLink>
				</Menu.Menu>
			</Menu>
		)
	}
}

const mapStateToProps = state => {
	return { authedUser: state.authedUser, users: state.users };
};

export default connect(mapStateToProps)(Navigation);