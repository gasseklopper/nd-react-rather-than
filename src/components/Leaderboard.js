import React, { Component } from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import LeaderBoardCard from "./LeaderBoardCard"
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
	return(
		<Container>
			<Header as='h1'>Leader Board</Header>
			<Header as='h3'>Would You Rather than?</Header>
			<Grid columns={3} divided>
				<Grid.Row stretched>
				<Grid.Column>
					<LeaderBoardCard></LeaderBoardCard>
				</Grid.Column>
				<Grid.Column>
					<LeaderBoardCard></LeaderBoardCard>
				</Grid.Column>
				<Grid.Column>
					<LeaderBoardCard></LeaderBoardCard>
				</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	)
}
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const leaderboardPlacements = userIds.map(id => ({
    id: id,
    points:
      Object.keys(users[id].answers).length +
      Object.keys(users[id].questions).length
  }))

  return {
    leaderboardPlacements,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
