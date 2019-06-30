import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Menu, Label } from 'semantic-ui-react'
import { connect } from "react-redux"

 class Navigation extends Component {

	render() {
    const { users, authedUser } = this.props;
    const { name, avatarURL } = users[authedUser];

		return (
			<Menu>
				<NavLink to="/dashboard" exact className="item" activeClassName="active">
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
					<NavLink to="/logout" exact className="item" activeClassName="active">
						Logout
					</NavLink>
				</Menu.Menu>
			</Menu>
		)
	}
}

const mapStateToProps = state => {
  return { authedUser: state.authedUser, users: state.users };
};

export default connect(mapStateToProps)(Navigation);