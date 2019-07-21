import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Form, Button, Header, Container, Card } from 'semantic-ui-react'

class AddPoll extends Component {
	state = {
		redirect: false,
		optionOneText: '',
		optionTwoText: ''
	}

	inputOnChange = e => {
		const inputValue = e.target.value
		const inputName = e.target.name

		this.setState(() => ({
		[inputName]: inputValue
		}))
	}

	createQuestion = e => {
		e.preventDefault()
		const { optionOneText, optionTwoText } = this.state
		const { dispatch, authedUser } = this.props

		dispatch(
		handleSaveQuestion({ optionOneText, optionTwoText, authedUser })
		).then(() =>
			this.setState(() => ({
				redirect: true
			}))
		)
	}

	render() {
		const { redirect, optionOneText, optionTwoText } = this.state
		const disableSubmit = optionOneText === '' ? true : optionTwoText === ''

		if (redirect) {
			return <Redirect to={`/`} />
		}

		return (
			<Container>
				<Header as='h1'>Add question</Header>
				<Card fluid>
					<Card.Content>
						<Card.Header>Would You Rather than?</Card.Header>
					</Card.Content>
					<Card.Content extra>
						<Form onSubmit={this.createQuestion}>
							<Form.Field>
								<label>Option one</label>
								<input placeholder='Please enter option one text here'
									onChange={this.inputOnChange}
									value={optionOneText}
									name="optionOneText"
								/>
							</Form.Field>
							<Form.Field>
								<Header as='h4'>and</Header>
								<label>Option two</label>
								<input placeholder='Please enter option two text here'
									onChange={this.inputOnChange}
									value={optionTwoText}
									name="optionTwoText"
								/>
							</Form.Field>
							<Button type='submit' primary disabled={disableSubmit}>Submit</Button>
						</Form>
					</Card.Content>
				</Card>
			</Container>
		)
	}
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(AddPoll)