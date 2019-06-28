export const RECEIVE_QUESTIONS = 'RECIEVE_QUESTIONS'

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}

}