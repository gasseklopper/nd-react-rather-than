import React, { Component } from 'react'
import { Grid, Container, Header, Card, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
	render() {
		const { users, userPlacements, authedUser } = this.props
		return(
			<Container >
				<Header as='h1'>Leader Board</Header>
				<Header as='h3'>Would You Rather than?</Header>
				<Grid columns={3}>
					<Grid.Row stretched>
						{userPlacements.sort((a, b) => b.questionPoints - a.questionPoints).map(user => (
							<Grid.Column key={user.id}>
								<Card>
									<Image src={users[user.id].avatarURL} wrapped ui={false} />
									<Card.Content>
										<Card.Header>{`${users[user.id].name}`}{authedUser === user.id &&	<span> (You)</span>}</Card.Header>
										<Card.Description>
											<b>{user.questionPoints} pts</b>
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<p>Questions answered: {Object.keys(users[user.id].answers).length}</p>
										<p>Questions asked: {Object.keys(users[user.id].questions).length}</p>
									</Card.Content>
								</Card>
							</Grid.Column>
						))}
					</Grid.Row>
				</Grid>
			</Container>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	const userIds = Object.keys(users)
	const userPlacements = userIds.map(id => ({
		id: id,
		questionPoints:
			Object.keys(users[id].answers).length +
			Object.keys(users[id].questions).length
	}))

	return {
		userPlacements,
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Leaderboard)