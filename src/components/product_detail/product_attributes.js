import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductAttr extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_attrs: this.props.Product.selectedSku.attrs
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
      this.props.Set_selected_sku(selected_sku);
    });
  }

  render() {
    return (
      <div className="attr-container com-padding">
        {Object.keys(this.props.Product.attrList).map((attr, i)=> {return (
          <div className="attr-block" key={i}>
            <h3 htmlFor={attr}>{attr}:</h3>
            <select className="form-control" id={attr} defaultValue={this.props.Product.selectedSku.attrs[attr]} onChange={(e) => this.change_sku(attr, e.target.value)} >
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
