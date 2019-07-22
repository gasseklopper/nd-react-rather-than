import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import { Header, Tab, Message, Grid } from 'semantic-ui-react'

class Dashboard extends Component {

	render() {
		const {unansweredQuestionsIds, answeredQuestionsIds} = this.props

		const panes = [
			{
				menuItem: 'Unanswered', render: () =>
					<Tab.Pane attached={false}>
						{unansweredQuestionsIds.length === 0 &&
						<Message
							content='All questions answered'
						/>
						}
						<Grid container columns={2}>
							<Grid.Row stretched >
								{unansweredQuestionsIds.map((id) => <QuestionList key={id} id={id}/>)}
							</Grid.Row>
						</Grid>
					</Tab.Pane>
			},
			{
				menuItem: 'Answered', render: () =>
					<Tab.Pane attached={false}>
						{answeredQuestionsIds.length === 0 &&
						<Message
							content='No questions answered'
						/>
						}
						<Grid columns={2}>
							<Grid.Row stretched>
								{answeredQuestionsIds.map((id) => <QuestionList key={id} id={id}/>)}
							</Grid.Row>
						</Grid>
					</Tab.Pane>
			},
		]

		return (
			<div>
				<Header as='h2'>Dashboard</Header>
				<Tab menu={{secondary: true, pointing: true}} panes={panes} defaultActiveIndex={0}/>
			</div>
		)
	}
}

function mapStateToProps({questions, authedUser}) {
	const unansweredQuestionsIds = Object.keys(questions)
		.filter((i) => !questions[i].optionOne.votes.includes(authedUser) && !questions[i].optionTwo.votes.includes(authedUser))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

	const answeredQuestionsIds = Object.keys(questions)
		.filter((i) => questions[i].optionOne.votes.includes(authedUser) || questions[i].optionTwo.votes.includes(authedUser))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

	return {
		unansweredQuestionsIds,
		answeredQuestionsIds
	}
}

export default connect(mapStateToProps)(Dashboard)