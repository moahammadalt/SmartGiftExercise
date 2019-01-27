import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';

class ColorPalette extends Component {

  constructor(props){
    super(props);
    this.state = {
      show_header_color_picker: false,
      show_background_color_picker: false,
      header_color: props.Color_palette.header_color,
      background_color: props.Color_palette.background_color,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      header_color: nextProps.Color_palette.header_color,
      background_color: nextProps.Color_palette.background_color,
    }
  }

  render() {

    return (
      <div className="color-palette-container com-padding">
        <div className="col-md-6">
          <h4 className="color-picker-label">Header color: </h4>
          <button onClick={() => this.setState({show_header_color_picker: !this.state.show_header_color_picker})}><span style={{backgroundColor: this.state.header_color}} className="color-btn"></span></button>
          { 
            this.state.show_header_color_picker ? 
            <div className="color-popover" >
            <div className="color-cover" onClick={() => this.setState({show_header_color_picker: false})}/>
              <ChromePicker 
                color={ this.state.header_color }
                onChange={ (color) => this.props.Set_header_color(color.hex) }
              />
            </div> : 
            null
          }
        </div>
        <div className="col-md-6">
          <h4 className="color-picker-label">Background color: </h4>
          <button onClick={() => this.setState({show_background_color_picker: !this.state.show_background_color_picker})}><span style={{backgroundColor: this.state.background_color}} className="color-btn"></span></button>
          { 
            this.state.show_background_color_picker ? 
            <div className="color-popover" >
            <div className="color-cover" onClick={() => this.setState({show_background_color_picker: false})}/>
              <ChromePicker 
                color={ this.state.background_color }
                onChangeComplete={ (color) => this.props.Set_background_color(color.hex) }
              />
            </div> : 
            null
          }
        </div>
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Set_header_color: (val) => {
      dispatch({
        type: 'SET_HEADER_COLOR',
        payload: val
      });
    },
    Set_background_color: (val) => {
      dispatch({
        type: 'SET_BACKGROUND_COLOR',
        payload: val
      });
    }
  };
};

export default connect(state => state, mapDispatchToProps)(ColorPalette);