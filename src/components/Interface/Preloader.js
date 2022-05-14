import React, { Component } from 'react';

class Preloader extends Component {

	constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div id="loader" className="loader"></div>
        );
    }
    
}

export default Preloader;