import React, { Component } from 'react';

class ProductsCards extends Component {

	constructor(props) {
        super(props);
        this.models = props.models;
        this.cardClick = props.cardClick;
        this.basePathToModel = props.basePathToModel;
        this.cardClickhandler = this.cardClickhandler.bind(this);
        // console.log(props);
    }
    
    cardClickhandler(e) {
        this.cardClick(e);
    }

    render() {
        return (
            this.models.map((model, id) =>
                <a 
                    href="#" 
                    onClick={this.cardClickhandler} 
                    key={id} 
                    id={model.folderName} 
                    data-id={model.id} 
                    data-price={model.price} 
                    data-brand={model.brand} 
                    className="change-model"
                >
                    <img 
                        width="180" 
                        height="106" 
                        loading="lazy" 
                        alt={model.folderName} 
                        src={this.basePathToModel + model.folderName + '/' + model.image} 
                        // src={this.basePathToModel + model.folderName + '/' + model.image} 
                    />
                    <div className="model-title">{model.title}</div>
                </a>
            )
        );
    }
    
}

export default ProductsCards;