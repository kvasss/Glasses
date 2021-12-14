import React, { Component } from 'react';

class EmptyModel extends Component {

	constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="no-model">Нет 3D модели</div>
        );
    }
    
}

export default EmptyModel;