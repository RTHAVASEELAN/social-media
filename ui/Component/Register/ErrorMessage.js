import React, { Component } from 'react';

class ErrorMessage extends Component {
    constructor() {
        super()
        this.state = {
            nameError: true
        }
    }
    errorMsg = (e) => {
        if (e.taget.value == ' ') {
            this.setState({ nameError: false })
            debugger
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.nameError ? null : <div>error</div>
                }
                <input type="text" onClick={this.errorMsg} />
            </div>
        )
    }
}

export default ErrorMessage;
