import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../../actions/questions'
import Option from "./Option"
import MissingQuestion from "./MissingQuestion";
import { Redirect } from 'react-router-dom'
import { Card,  Button,  Image } from 'semantic-ui-react'

class Question extends Component {
	state = {
		vote: false,
		redirect: false,
	}

	handleVote = (vote) => {
		const {dispatch, question, authedUser} = this.props

		dispatch(handleAnswerQuestion(question.id, vote, authedUser))
		.then(() =>

			this.setState(() => ({
				redirect: true
			}))
		)
	}

	render() {
		const {question, author, redirect, authedUser} = this.props

				if (redirect) {
			return <Redirect to={`/Dashboard`} />
		}

		return (
			<Fragment>
				{question
					?
					(<div>
										<Card>
					<Image src={author.avatarURL} alt={author.name} wrapped ui={false} />
					<Card.Content>
						<Card.Header>{author.name}{authedUser === author.id &&	<span> (You)</span>}</Card.Header>
						<Card.Description>
							Would you rather
							<Button>
								<Option questionId={question.id} optionName="optionOne" onClick={this.handleVote}/>
							</Button>
							  or <Option questionId={question.id} optionName="optionTwo" onClick={this.handleVote}/>?
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
					</Card.Content>
				</Card>
					</div>)
					: <MissingQuestion/>}
			</Fragment>
		)
	}
}

function mapStateToProps({questions, users, authedUser}, props) {
	const {question_id} = props.match.params
	const question = questions[question_id]
	const user = users[authedUser]

	return {
		question: question || null,
		author: users[question.author],
		authedUser,
		showResults: Object.keys(user.answers).includes(question_id)
	}
}

export default connect(mapStateToProps)(Question)