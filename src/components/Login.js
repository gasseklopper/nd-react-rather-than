import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Form, Card, Container, Button } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    selectedUser: null,
    message: { hidden: true, content: "" }
  };
  referrer = null;

  componentDidMount() {
    const { history, location: { pathname }} = this.props;
    this.referrer = pathname;
    history.push("/login");
  }

  handleUserSelection = (event, data) => {
    this.setState({ selectedUser: data.value });
  };

  handleUserLogin = () => {
    const { history } = this.props;
    if (!this.state.selectedUser) {
      this.setState({
        message: {
          hidden: false,
          content: "Please select a user"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      });
    }

    this.props.setAuthedUser(this.state.selectedUser);
    if (this.referrer === "/logout" || this.referrer === "/login") {
      history.push("/dashboard");
    } else {
      history.push(this.referrer);
    }
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }

    const userOptions = Object.keys(users).map(userId => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL }
    }));

    const { message } = this.state;

    return (
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
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Login);
