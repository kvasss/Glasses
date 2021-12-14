import React, { Component } from 'react';

class Accept extends Component {

	constructor(props) {
        super(props);
		// console.log(props);
        this.acceptTransform = props.acceptTransform;
    }

    render() {
        return (
            <button onClick={this.acceptTransform} id="accept" className="active">
                <i className="flaticons-accept"></i>
            </button>
        );
    }
    
}

export default Accept;