import { SIGNUP_USERNAME_FIELD_STATUS, SIGNUP_PASSWORD_FIELD_STATUS, SIGNUP_CONFIRM_PASSWORD_FIELD_STATUS } from '../constants/ActionTypes'

export const usernameFieldStatusAction = (username) => {
    console.log("in the action method. usernameFieldStatusAction << ")
    return {
        type: SIGNUP_USERNAME_FIELD_STATUS,
        username
    }
}

export const passwordFieldStatusAction = (password) => {
    console.log("in the password action method.")
    return {
        type: SIGNUP_PASSWORD_FIELD_STATUS,
        password
    }
}

export const confirmPasswordFieldStatusAction = (confirmPassword) => {
    console.log("in the confirm password action method")
    return {
        type: SIGNUP_CONFIRM_PASSWORD_FIELD_STATUS,
        confirmPassword
    }
}