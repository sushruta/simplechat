import React from 'react'
import reactcss from 'reactcss'

export default React.createClass({
    render() {
        const styles = reactcss({
            default: {
                'header': {
                    width: '100%',
                    height: '20px',
                    background: 'salmon',
                    position: 'fixed',
                    top: '0',
                    textAlign: 'center',
                },
                'footer': {
                    width: '100%',
                    height: '20px',
                    background: 'salmon',
                    position: 'fixed',
                    bottom: '0',
                    textAlign: 'center',
                },
                'content': {
                    width: '80%',
                    margin: '5px auto',
                    padding: '20px 0',
                },
            }
        })

        return (
            <div>
                <header style={styles.header}>Basic Chat Application</header>
                <div style={styles.content}>
                    {this.props.children}
                </div>
                <footer style={styles.footer}>sashidhar guntury - sguntury@gmail.com</footer>
            </div>
        )
    }
})