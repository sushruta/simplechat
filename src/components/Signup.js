import React from 'react'
import { browserHistory, connect } from 'react-redux'
import { Panel, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import reactcss from 'reactcss'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { usernameFieldStatusAction, passwordFieldStatusAction, confirmPasswordFieldStatusAction } from '../actions/SignupActionCreators'
import { USERNAME_NOT_INITIALIZED, USERNAME_EMPTY, USERNAME_OK, USERNAME_ALREADY_EXISTS } from '../constants/StatusTypes'
import { PASSWORD_OK, PASSWORD_EMPTY, PASSWORD_NOT_INITIALIZED } from '../constants/StatusTypes'
import { CONFIRM_PASSWORD_MATCHED, CONFIRM_PASSWORD_NOT_MATCHED, CONFIRM_PASSWORD_NOT_INITIALIZED, CONFIRM_PASSWORD_EMPTY } from '../constants/StatusTypes'

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            usernameFieldStatus: USERNAME_NOT_INITIALIZED,
            passwordFieldStatus: PASSWORD_NOT_INITIALIZED,
            confirmPasswordFieldStatus: CONFIRM_PASSWORD_NOT_INITIALIZED,
            username: '',
            password: '',
            confirmPassword: '',
            signupButtonDisabled: true
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    }

    handleOnChange(event) {
        if (event.target.name === 'Username') {
            this.setState({username: event.target.value})
        } else if (event.target.name == 'Password') {
            this.setState({password: event.target.value})
        } else if (event.target.name == 'ConfirmPassword') {
            this.setState({confirmPassword: event.target.value})
        } else {
            // meh
        }
    }

    handleSignupSubmit(event) {
        console.log("in the signup step")
    }

    handleOnBlur(event) {
        const {dispatch} = this.props
        if (event.target.name === "Username") {
            console.log("out of username focus area")
            dispatch(usernameFieldStatusAction(this.state.username))
        } else if (event.target.name === "Password") {
            console.log("out of password focus area")
            dispatch(passwordFieldStatusAction(this.state.password))
        } else if (event.target.name === "ConfirmPassword") {
            console.log("out of confirm password focus area")
            dispatch(confirmPasswordFieldStatusAction(this.state.confirmPassword))
        } else {
            // to be filled in ...
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            usernameFieldStatus: nextProps.usernameFieldStatus,
            passwordFieldStatus: nextProps.passwordFieldStatus,
            confirmPasswordFieldStatus: nextProps.confirmPasswordFieldStatus
        })
    }

    checkUsernameFieldStatus() {
        if (this.state.usernameFieldStatus === USERNAME_ALREADY_EXISTS) {
            return {__html: 'username already in use. Please try something else'}
        } else if (this.state.usernameFieldStatus === USERNAME_EMPTY) {
            return {__html: 'please fill the username. cannot be left blank'}
        } else {
            return {__html: ''}
        }
    }

    checkPasswordFieldStatus() {
        if (this.state.passwordFieldStatus === PASSWORD_EMPTY) {
            return {__html: 'please fill the password. cannot be left blank'}
        } else {
            return {__html: ''}
        }
    }

    checkConfirmPasswordFieldStatus() {
        console.log(this.state.confirmPasswordFieldStatus)
        if (this.state.confirmPasswordFieldStatus === CONFIRM_PASSWORD_MATCHED) {
            console.log("also here")
            return {__html: 'passwords match ... '}
        } else if (this.state.confirmPasswordFieldStatus === CONFIRM_PASSWORD_NOT_MATCHED) {
            return {__html: 'passwords do not match. Please re-enter the password.'}
        } else if (this.state.confirmPasswordFieldStatus === CONFIRM_PASSWORD_EMPTY) {
            return {__html: 'please confirm the password. can not be left blank.'}
        } else {
            return {__html: ''}
        }
    }

    setButtonDisabledStatus() {
        if (USERNAME_OK && PASSWORD_OK && CONFIRM_PASSWORD_MATCHED) {
            this.setState({ signupButtonDisabled: false })
        } else {
            this.setState({ signupButtonDisabled: true })
        }
    }

    render() {
        const styles = reactcss({
            default: {
                'panelstyle': {
                    textAlign: 'center',
                    background: 'cadetblue',
                },
            },
        })

        return (
            <div>
                <Panel style={styles.panelstyle}>
                    <Form>
                        <FormGroup controlId="formControlsUsername">
                            <FormControl type="username" label="Username" name="Username" placeholder="username" onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                        </FormGroup>

                        <div color="red" dangerouslySetInnerHTML={this.checkUsernameFieldStatus()} />

                        <FormGroup controlId="formControlsPassword">
                            <FormControl type="password" label="Password" name="Password" placeholder="password" onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                        </FormGroup>

                        <div color="red" dangerouslySetInnerHTML={this.checkPasswordFieldStatus()} />

                        <FormGroup controlId="formControlsConfirmPassword">
                            <FormControl type="password" label="ConfirmPassword" name="ConfirmPassword" placeholder="confirm password" onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                        </FormGroup>

                        <div color="red" dangerouslySetInnerHTML={this.checkConfirmPasswordFieldStatus()} />

                        <Button type="button" disabled={this.state.signupButtonDisabled} onClick={this.handleSignupSubmit}>
                            Signup
                        </Button>
                    </Form>
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usernameFieldStatus: state.signupStatusReducer.usernameField,
        passwordFieldStatus: state.signupStatusReducer.passwordField,
        confirmPasswordFieldStatus: state.signupStatusReducer.confirmPasswordField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(Signup)