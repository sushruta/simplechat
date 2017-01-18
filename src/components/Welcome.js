import React from 'react'
import reactcss from 'reactcss'

import { Panel } from 'react-bootstrap'

import { browserHistory } from 'react-router'

class Welcome extends React.Component {
    constructor(props) {
        super(props)

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    }

    handleLoginSubmit(event) {
        browserHistory.push("/login")
    }

    handleSignupSubmit(event) {
        browserHistory.push("/signup")
    }

    render() {
        const styles = reactcss({
            default: {
                'panelstyle': {
                    textAlign: 'center',
                    background: 'cadetblue',
                },
                'title': {
                    fontWeight: 'bold',
                },
                'buttongroup': {
                    display: 'inline',
                    margin: '10px'
                },
                'button': {
                    margin: '5px'
                },
            },
        })

        return (
            <Panel style={styles.panelstyle}>
                <div style={styles.title}>Welcome to Simple Chat v1</div>
                <span style={styles.buttongroup}>
                    <button type="button" style={styles.button} onClick={this.handleLoginSubmit}>Login</button>
                    <button type="button" style={styles.button} onClick={this.handleSignupSubmit}>Signup</button>
                </span>
            </Panel>
        )
    }
}

export default Welcome