import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
Button,
} from "semantic-ui-react";



class Option extends Component {
		state = {
		redirect: false,
	}
	handleClick = (e) => {
		console.log('test', e)
		e.preventDefault()
		const {onClick, optionName} = this.props
		onClick(optionName)
	}

	render() {
		const { redirect } = this.state
		const {option, showResults, isVoted, percentage} = this.props

		const {text, votes} = option

		if (redirect) {
			return <Redirect to={`/Dashboard`} />
		}

		return (
			showResults === false ?
				<Button  onClick={this.handleClick}>
					<div>
						<div>
							<div>{text}</div>
						</div>
					</div>
				</Button>
				:
				<div>
					<div>
						{isVoted ? 	<div> Your Vote</div> : ''}
						<div>{text}</div>
						{showResults === true &&
						(<div>Numbero Ofyxcv Votes: {votes.length} ({percentage}%)</div>)
						}
					</div>
				</div>
		)
	}
}

function mapStateToProps({authedUser, questions, users}, {questionId, optionName}) {
	const question = questions[questionId]
	const option = question[optionName]
	const currentUser = users[authedUser]

	return {
		option,
		isVoted: option.votes.includes(authedUser),
		showResults: Object.keys(currentUser.answers).includes(questionId),
		percentage: ((option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2),
		optionName
	}
}

export default connect(mapStateToProps)(Option)