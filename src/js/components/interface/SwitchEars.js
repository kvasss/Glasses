import React, { Component } from 'react';

class SwitchEars extends Component {

	constructor(props) {
        super(props);
        this.onClick = props.onClick;
    }

    render() {
        return (
            <button onClick={this.onClick} id="switch_ears" className="switch-ears">
				<i className="flaticons-eyeglasses"></i>
			</button>
        );
    }
    
}

export default SwitchEars;