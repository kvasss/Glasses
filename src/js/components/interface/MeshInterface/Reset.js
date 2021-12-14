import React, { Component } from 'react';

class Reset extends Component {

	constructor(props) {
        super(props);
        // console.log(props);
        this.resetTransform = props.resetTransform;
    }

    render() {
        return (
            <button onClick={this.resetTransform} id="reset" className="active">
                <i className="flaticons-reset"></i>
            </button>
        );
    }
    
}

export default Reset;