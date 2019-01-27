import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductSubmitBtn extends Component {

  constructor(props){
    super(props);
    this.submit_product = this.submit_product.bind(this);
  }

  submit_product(){
    console.log(this.props.Selected_sku);
    let body_msg = this.props.Selected_sku.orderable ? 'purchase has been completed' : 'sorry, this product is not available now, try another attributes';
    let title_msg = this.props.Selected_sku.orderable ? 'Success' : 'Fail';

    this.props.Show_modal({
      title: title_msg,
      body: body_msg
    });
  }

  render() {
    return (
      <div className="btn-container com-padding">
        <button className="btn btn-primary btn-lg" onClick={() => this.submit_product()}>Sumbit</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Show_modal: (obj) => {
      dispatch({
        type: 'SET_MODAL',
        payload: obj
      })
    }
  };
};

export default connect(state => state, mapDispatchToProps)(ProductSubmitBtn);
