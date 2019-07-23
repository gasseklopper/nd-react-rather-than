import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../../actions/questions'
import Option from "./Option"
import MissingQuestion from "./MissingQuestion"
import { Card, Image } from 'semantic-ui-react'

class Question extends Component {
	state = {
		vote: false,
	}

	handleVote = (vote) => {
		const {dispatch, question, authedUser} = this.props

		dispatch(handleAnswerQuestion(question.id, vote, authedUser))
	}

	render() {
		const {question, author, authedUser} = this.props

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
									<p>Would you rather</p>
									<Option questionId={question.id} optionName="optionOne" onClick={this.handleVote}/>
									<p>or</p>
									<Option questionId={question.id} optionName="optionTwo" onClick={this.handleVote}/>
									<p>?</p>
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
	const author = question !== undefined ? users[question.author] : ''

	return {
		question: question || null,
		author,
		authedUser,
	}
}

export default connect(mapStateToProps)(Question)