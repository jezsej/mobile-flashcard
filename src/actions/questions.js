import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';
import { showLoading, hideLoading } from 'react-redux-loading'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

export function receiveQuesitons(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }

}

export function addAnswerToQuestion(authUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authUser,
        qid,
        answer
    };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return dispatch => {
        dispatch(showLoading())
        return saveQuestion({ optionOneText, optionTwoText, author }).then(
            question => {
                dispatch(addQuestion(question));
                dispatch(addQuestionToUser(question));
            }
        ).then(() => dispatch(hideLoading()));
    };
}