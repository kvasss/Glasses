import React, { Component } from 'react';

class Logo extends Component {

	constructor(props) {
        super(props);
        this.logoUrl = props.logoUrl;
    }

    render() {
        return (
            <img 
                width="90"
                height="31"
                className="logo" 
                src={this.logoUrl} 
            />
        );
    }
    
}

export default Logo;