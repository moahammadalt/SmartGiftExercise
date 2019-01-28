import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductImage extends Component {

  constructor(props){
    super(props);
    this.state = {
      product_images: props.Selected_sku.images,
      current_image: 0,
      background_position: '0% 0%'
    }

    this.handle_mouse_move = this.handle_mouse_move.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      product_images: nextProps.Selected_sku.images
    }
  }

  handle_mouse_move(e){
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    this.setState({ background_position: `${x}% ${y}%` })
  }

  render() {
    return (
      <div className="image-container com-padding">
        <div className="image-body">

          <figure 
            onMouseMove={(e) => this.handle_mouse_move(e)} 
            style={{
              backgroundImage: `url(${this.state.product_images[this.state.current_image].url})`,
              backgroundPosition: this.state.background_position
            }
          }>
            <img className="rounded" src={this.state.product_images[this.state.current_image].url} alt="not available now" />
          </figure>

          <br /><br />

          <button 
            className="btn btn-default btn-sm m-r-15" 
            disabled={this.props.Selected_sku.images.length === this.state.current_image + 1} 
            onClick={() => this.setState({current_image: this.state.current_image + 1})}
          >
            {'< '}previous
          </button>

          <button 
            className="btn btn-default btn-sm m-l-15"
            disabled={this.state.current_image === 0} 
            onClick={() => this.setState({current_image: this.state.current_image - 1})}
          >
            next {' >'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(ProductImage);
