import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as H from '../../globals/helper';

class ProductAttr extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_attrs: this.props.Product.selectedSku.attrs,
      refresh_attr: false
    }
    this.change_sku = this.change_sku.bind(this);
  }

  change_sku(attr, val){

    let tmp_attr = {...this.state.current_attrs};
    tmp_attr[attr] = val;
    // here we get the new selected attr
    this.setState({current_attrs: tmp_attr}, ()=>{
      // search for the propriate sku attr to change the selected_sku object
      let selected_sku = this.props.Product.skus.filter(obj => {
        let attr_matched = true;
        for(var key in obj.attrs){
          if(obj.attrs[key] !== this.state.current_attrs[key]){
            attr_matched = false;
          }
        }
        if(attr_matched){
          return obj;
        }
      })[0];

      if(selected_sku){
        this.props.Set_selected_sku(selected_sku);
      }
      else{
        H.error_handler('Ops, something wrong in this combination, the selcted sku is not exist.')
      }
      
    });
  }

  render() {
    return (
      <div className="attr-container com-padding">
        {Object.keys(this.props.Product.attrList).map((attr, i)=> {return (
          <div className="attr-block" key={i}>
            <h3 htmlFor={attr}>{attr}:</h3>
            <select className="form-control" value={this.props.Selected_sku.attrs[attr]} onChange={(e) => this.change_sku(attr, e.target.value)} >
              {this.props.Product.attrList[attr].map((val, index) => 
                <option key={index} value={val}>{val}</option>
              )}
            </select>
          </div>
        )})}
      
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Set_selected_sku: (obj) => {
      dispatch({
        type: 'SET_SELECTED_SKU',
        payload: obj
      });
    }
  };
};

export default connect(state => state, mapDispatchToProps)(ProductAttr);
