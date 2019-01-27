import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as H from '../../globals/helper';
import ProductImage from './product_image';
import ProductName from './product_name';
import ProductAttr from './product_attributes';
import ProductDecs from './product_description';
import ProductSubmitBtn from './product_submit_btn';


class ProductContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      is_data_ready: false
    }
  }

  componentDidMount(){
    
    const { match: { params } } = this.props;

    H.api.get(`/products/get-product-by-code/${params.code}`, data =>{
      
      this.props.Set_selected_product(data);
      this.props.Set_selected_sku(data.selectedSku);
      
      this.setState({is_data_ready: true});

      this.props.Show_modal({
        title: 'Welcome to SmartGift'
      });

      setTimeout(()=>{
        this.props.Close_modal()
      }, 1500);
    });
  }
  
  render() {
    return (
      !this.state.is_data_ready ? 
      <div>loading...</div> :
      <div className="product-container">
        <div className="col-md-6">
          <ProductImage />
          <ProductDecs />
        </div>
        <div className="col-md-6">
          <ProductName />
          <ProductAttr />
          <ProductSubmitBtn />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Set_selected_product: (obj) => {
      dispatch({
        type: 'SET_SELECTED_PRODUCT',
        payload: obj
      });
    },
    Set_selected_sku: (val) => {
      dispatch({
        type: 'SET_SELECTED_SKU',
        payload: val
      });
    },
    Show_modal: (obj) => {
      dispatch({
        type: 'SET_MODAL',
        payload: obj
      })
    },
    Close_modal: () => {
      dispatch({
        type: 'HIDE_MODAL',
      });
		}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
