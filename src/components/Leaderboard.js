import React from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import LeaderBoardCard from "./LeaderBoardCard";

const Leaderboard = () => {
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

export default Leaderboard
