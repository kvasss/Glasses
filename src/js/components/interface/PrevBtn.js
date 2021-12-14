import React, { Component } from 'react';

class PrevBtn extends Component {

	constructor(props) {
        super(props);
        this.onClick = props.onClick;
    }

    render() {
        return (
            <button onClick={this.onClick} id="prev" className="prev-model">
				<i className="flaticons-prev"></i>
			</button>
        );
    }
    
}

export default PrevBtn;