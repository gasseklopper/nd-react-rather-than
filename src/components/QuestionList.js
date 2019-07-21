import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card,  Button,  Image, Grid } from 'semantic-ui-react'

class QuestionList extends Component {
	QuestionPage = (e, id) => {
		e.preventDefault()
		this.props.history.push(`/question/${id}`)
	}

	render() {
		const {question, author, authedUser,  authedAnswered} = this.props

		return (
			<Grid.Column key={author.id}
				style = {
					{ paddingBottom: "3em" }
				}>
				<Card>
					<Image src={author.avatarURL} alt={author.name} wrapped ui={false} />
					<Card.Content>
						<Card.Header>{author.name}{authedUser === author.id &&	<span> (You)</span>}</Card.Header>
						<Card.Description>
							Would you rather {question.optionOne.text} or {question.optionTwo.text}?
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button fluid primary onClick={(e) => this.QuestionPage(e, question.id)}>{authedAnswered ?
						<span>Details</span> : <span>Vote</span>}</Button>
					</Card.Content>
				</Card>
			</Grid.Column>
		)
	}
}

function mapStateToProps({questions, users, authedUser}, {id}) {
	const question = questions[id]

	const AuthedAnsweredCheck = () => {
		if(question.optionOne.votes.includes(authedUser))
			return 'Option One'
		else if (question.optionTwo.votes.includes(authedUser))
			return 'Option Two'
		else return null;
	};

	return {
		question: question || null,
		author: users[question.author],
		authedUser,
		authedAnswered: AuthedAnsweredCheck(),
	}
}

export default withRouter(connect(mapStateToProps)(QuestionList))