import {combineReducers} from 'redux'

import { SIGNUP_USERNAME_FIELD_STATUS, SIGNUP_PASSWORD_FIELD_STATUS, SIGNUP_CONFIRM_PASSWORD_FIELD_STATUS } from '../constants/ActionTypes'
import { USERNAME_NOT_INITIALIZED, USERNAME_ALREADY_EXISTS, USERNAME_EMPTY, USERNAME_OK } from '../constants/StatusTypes'
import { PASSWORD_NOT_INITIALIZED, PASSWORD_OK, PASSWORD_EMPTY } from '../constants/StatusTypes'
import { CONFIRM_PASSWORD_NOT_INITIALIZED, CONFIRM_PASSWORD_EMPTY, CONFIRM_PASSWORD_MATCHED, CONFIRM_PASSWORD_NOT_MATCHED } from '../constants/StatusTypes'

const sampleReducer = (state = {}, action) => {
    return state
}

const initialState = {
    usernameField: USERNAME_NOT_INITIALIZED,
    passwordField: PASSWORD_NOT_INITIALIZED,
    confirmPasswordField: CONFIRM_PASSWORD_NOT_INITIALIZED,
    username: '',
    password: ''
}

const signupStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USERNAME_FIELD_STATUS:
            console.log("in our reducer!")
            if (action.username) {
                console.log(action.username)
                const newState = Object.assign({}, state, {
                    usernameField: USERNAME_OK // ALREADY_EXISTS
                })
                // else return USERNAME_OK
                return newState
            } else {
                const newState = Object.assign({}, state, {
                    usernameField: USERNAME_EMPTY
                })
                return newState
            }
        case SIGNUP_PASSWORD_FIELD_STATUS:
            console.log("in our password reducer!")
            if (action.password) {
                console.log(action.password)
                const newState = Object.assign({}, state, {
                    passwordField: PASSWORD_OK,
                    password: action.password
                })
                return newState
            } else {
                const newState = Object.assign({}, state, {
                    passwordField: PASSWORD_EMPTY
                })
                return newState
            }
        case SIGNUP_CONFIRM_PASSWORD_FIELD_STATUS:
            console.log("in our confirm password reducer")
            let newStatus = CONFIRM_PASSWORD_NOT_INITIALIZED
            if (action.confirmPassword) {
                if (state.password && state.password === action.confirmPassword) {
                    console.log("passwords match ... ")
                    newStatus = CONFIRM_PASSWORD_MATCHED
                } else {
                    console.log("passwords may not have matched ... ")
                    newStatus = CONFIRM_PASSWORD_NOT_MATCHED
                }
            } else {
                if (state.password) {
                    console.log("it is empty ... ")
                    newStatus = CONFIRM_PASSWORD_EMPTY
                }
            }
            const newState = Object.assign({}, state, {
                confirmPasswordField: newStatus
            })
            return newState
        default:
            return state
    }
}

const rootReducer = combineReducers({
    sampleReducer,
    signupStatusReducer
})

export default rootReducer