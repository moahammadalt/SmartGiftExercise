import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as H from '../../globals/helper';
import ProductImage from './product_image';
import ProductName from './product_name';
import ProductAttr from './product_attributes';
import ProductDecs from './product_description';
import ProductSubmitBtn from './product_submit_btn';
import ColorPalette from '../color_palette';


class ProductContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      is_data_ready: false
    }
  }

  componentDidMount(){
    
    const { match: { params } } = this.props;
    const now_time = (Math.floor(Date.now() / 1000));
    const api = `/products/get-product-by-code/${params.code}`;

    const initializer = (data) => {

      this.props.Set_selected_product(data);
      this.props.Set_selected_sku(data.selectedSku);
      
      this.setState({is_data_ready: true});

      this.props.Show_modal({
        title: 'Welcome to SmartGift'
      });

      setTimeout(()=>{
        this.props.Close_modal()
      }, 1000);
    };

    // check if the auth token is saved in the lcoalstorage to pass the authentication post request;
    if(this.props.Cached_apis[api] && (this.props.Cached_apis[api].expire_at > now_time)){
      
      initializer(this.props.Cached_apis[api].data)
    }
    else{
      H.api.get(api, data =>{

        // update cached api data with it's expire data
        let cached_apis = {...this.props.Cached_apis};
        cached_apis[api] = {
          expire_at: now_time + H.get_caching_time(),
          data: data
        }
        this.props.Set_cached_apis(cached_apis);
  
        initializer(data)
      });
    }

    
  }
  
  render() {
    return (
      !this.state.is_data_ready ? 
      <div className="loading"></div> :
      <div className="product-container">
        <div className="col-md-6">
          <ProductImage />
          <ProductDecs />
        </div>
        <div className="col-md-6 col-sm-12">
          <ProductName />
          <ProductAttr />
          <ProductSubmitBtn />
          <ColorPalette />
        </div>
      </div>
    );
  }
}

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
		},
    Set_cached_apis: (obj) => {
      dispatch({
        type: 'SET_CACHED_APIS',
        payload: obj
      });
    }
  };
};

export default connect(state => state, mapDispatchToProps)(ProductContainer);
