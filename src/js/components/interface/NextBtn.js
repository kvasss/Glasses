import React, { Component } from 'react';

class NextBtn extends Component {

	constructor(props) {
        super(props);
        this.onClick = props.onClick;
    }

    render() {
        return (
            <button onClick={this.onClick} id="next" className="next-model">
                <i className="flaticons-next"></i>
            </button>
        );
    }
    
}
export default NextBtn;