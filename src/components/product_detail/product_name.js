import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductName extends Component {

  render() {
    return (
      <div className="name-container com-padding">
        <h2>{this.props.Product.name}</h2>
      </div>
    );
  }
}

export default connect(state => state)(ProductName);

