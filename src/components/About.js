import React from 'react'
import reactcss from 'reactcss'
import { Panel } from 'react-bootstrap'

export default React.createClass({
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
            <panel style={styles.panelstyle}>
                A simple chat application
            </panel>
        )
    }
})