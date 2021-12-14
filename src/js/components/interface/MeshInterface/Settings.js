import React, { Component } from 'react';

class Settings extends Component {

	constructor(props) {
        super(props);
        this.switchVideo = props.switchVideo;
        this.testMode = this.props.testMode;
    }

    render() {
        if (this.testMode) {
            return (
                <button onClick={this.switchVideo} id="switch_video" className="active">
                    <i className="flaticons-photo"></i>
                </button>
            );
        } else {
            return (
                <div />
            );
        }
    }

    
}

export default Settings;