import { Component } from 'react';

class Link extends Component {

	constructor(props) {
        super(props);
        this.addToCart = this.props.addToCart;
    }

}

export default Link;