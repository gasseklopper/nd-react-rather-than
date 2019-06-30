import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { Menu, Label } from 'semantic-ui-react'

export default class MenuExampleSecondary extends Component {

	render() {


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
								<img alt='' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
									Elliot
							</Label>
						</div>
					</Menu.Item>
					<NavLink to="/login" exact className="item" activeClassName="active">
						Login
					</NavLink>
					<NavLink to="/logout" exact className="item" activeClassName="active">
						Logout
					</NavLink>
				</Menu.Menu>
			</Menu>
		)
	}
}