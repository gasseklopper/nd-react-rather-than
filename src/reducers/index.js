import { combineReducers } from 'redux'
import authedUser from './authedUsers'
import users from './users'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
	users,
	questions,
	authedUser,
	loadingBar: loadingBarReducer
})