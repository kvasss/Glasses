import React, { Component } from 'react';

class OptionsBtn extends Component {

	constructor(props) {
        super(props);
        this.showFaceMesh = props.showFaceMesh;
        this.helpText = props.helpText;
    }
    
    render() {
        return (
            <button onClick={this.showFaceMesh} id="options" className="options-btn">
                <span className="help-text">{this.helpText}</span>
				<i className="flaticons-options"></i>
			</button>
        );
    }
    
}

export default OptionsBtn;