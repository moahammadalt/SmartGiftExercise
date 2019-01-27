import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductImage extends Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      shown_image: props.Selected_sku.images[0].url
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      shown_image: nextProps.Selected_sku.images[0].url
    }
  }

  render() {
    return (
      <div className="image-container com-padding">
        <div className="image-body">
          <img className="rounded" src={this.state.shown_image}/>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(ProductImage);
