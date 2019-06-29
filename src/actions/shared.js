import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData (userId) {
	return dispatch => {
		dispatch(showLoading())
		return getInitialData()
			.then(({ users, questions }) => {
				dispatch(setAuthedUser(userId ? userId : null))
				dispatch(receiveQuestions(questions))
				dispatch(receiveUsers(users))
				dispatch(hideLoading())
			})
	}
}