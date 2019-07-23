import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { handleInitialData } from './shared'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const ANSWER_QUESTION = "ANSWER_QUESTION"

export function handleAnswerQuestion(qid, answer) {
	return (dispatch, getState) => {
		const {authedUser} = getState()
		dispatch(showLoading())
		return saveQuestionAnswer(authedUser, qid, answer)
			.then(() => {
				dispatch(handleInitialData())
				dispatch(hideLoading())
			})
	}
}

export function handleSaveQuestion(info) {
	return dispatch => {
		dispatch(showLoading())

		return saveQuestion({
			...info,
			author: info.authedUser
		})
		.then(res => dispatch(handleInitialData(res.author)))
		.then(() => dispatch(hideLoading()))
	}
}

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}