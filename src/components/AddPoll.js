import React from 'react'
import AddPollCard from "./AddPollCard";
import { Container, Header, Card } from 'semantic-ui-react';

const AddPoll = () => {
	return(
		<Container>
			<Header as='h1'>Add question</Header>
			<Card fluid>
				<Card.Content>
					<Card.Header>Would You Rather than?</Card.Header>
				</Card.Content>
				<Card.Content extra>
						<AddPollCard ></ AddPollCard>
				</Card.Content>
			</Card>
		</Container>
	)
}

export default AddPoll
