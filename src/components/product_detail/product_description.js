import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductDecs extends Component {
  
  render() {
    return (
      <div className="decs-container com-padding">
        <div className="panel panel-default">
          <div className="panel-heading">product details:</div>
          <div className="panel-body text-center">
            <h5>{this.props.Product.shortDesc}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(ProductDecs);

