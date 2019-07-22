import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Card, Container, Button, FormGroup } from "semantic-ui-react"
import { setAuthedUser } from "../actions/authedUser"
import { Redirect} from 'react-router-dom'

class Login extends Component {
	state = {
		username: '',
		isLogged: false,
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {username} = this.state
		const {dispatch} = this.props

		if (username !== "") {
			dispatch(setAuthedUser(username))
			this.setState(() => ({isLogged: true}))
		}
	}

	handleChange = (e) => {
		const username = e.target.value
		this.setState(() => ({username}))
	}

	render() {
		const {from} = this.props.location.state || {from: {pathname: '/'}}
		const {isLogged} = this.state

		if (isLogged) {
			return <Redirect to={from}/>
		}

		return (
			<Container>
				<Card centered>
					<Card.Content>
						<Card.Header>Select account and Login</Card.Header>
					</Card.Content>
					<Card.Content extra>
						<Form onSubmit={this.handleSubmit}>
								<FormGroup>
										<select id="username"
											value={this.state.username}
														onChange={this.handleChange}>
												<option value='' disabled>Select</option>
												{this.props.users.map((user) => (
													<option key={user.id} value={user.id}>{user.name}</option>
												))}
										</select>
								</FormGroup>
								<Button type="submit" id="_submit" name="_submit">
									Login
								</Button>
						</Form>
					</Card.Content>
				</Card>
			</Container>
		)
	}
}

function mapStateToProps({users, authedUser}) {
	return {
		users: Object.values(users).map((user) => {
			return ({
				id: user.id,
				name: user.name,
			})
		}),
		username: authedUser
	}
}

export default connect(mapStateToProps)(Login)