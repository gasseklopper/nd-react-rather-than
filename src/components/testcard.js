import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Message, Form, Card, Container, Button } from "semantic-ui-react";

class Login extends Component {
			state = {
		selectedUser: null,
		message: { hidden: true, content: "", header: "" }
	};
	referrer = null
  componentWillMount() {
		const {history,	location: { pathname }} = this.props
		this.referrer = pathname
		history.push("/")
  }
		handleUserSelection = (event, data) => {
		this.setState({ selectedUser: data.value })
	};
	handleUserLogin = (e) => {
		console.log(e)
		 e.preventDefault()
		const { history } = this.props
		if (!this.state.selectedUser) {
			this.setState({
				message: {
					hidden: false,
					content: "You must select a user",
					header: "Action Forbidden"
				}
			});
			return
		} else {
			this.setState({
				message: {
					hidden: true,
					content: "",
					header: ""
				}
			});
		}

		this.props.setAuthedUser(this.state.selectedUser)
		if (this.referrer === "/logout" || this.referrer === "/login") {
			history.push("/Home")
		} else {
			history.push(this.referrer)
		}
	};
  render() {
				const { users } = this.props;
		if (!users) {
			return
		}


		const userOptions = Object.keys(users).map(userId => ({
			key: userId,
			value: userId,
			text: users[userId].name,
			image: { avatar: true, src: users[userId].avatarURL }
		}))

		const { message } = this.state
    return (
      <div className="vote-container">
        <h2>Who are you?</h2>
			<Container>
				<Card centered>
					<Card.Content>
						<Card.Header>Select account and Login</Card.Header>
					</Card.Content>
					<Card.Content extra>
						<Form onSubmit={this.handleUserLogin}>
							<Form.Dropdown
								placeholder='Select User'
								fluid
								selection
								options={userOptions}
								onChange={this.handleUserSelection}
							/>
							<Message  hidden={message.hidden}
								negative
								header={message.header}
								content={message.content}
							/>
							<Button fluid type='submit'>Login</Button>
						</Form>
					</Card.Content>
				</Card>
			</Container>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
	return { users }
};

export default connect( mapStateToProps, { setAuthedUser })(Login)
