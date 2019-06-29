
import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { handleInitialData } from './shared'

export const RECEIVE_QUESTIONS = 'RECIEVE_QUESTIONS'





export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}

}