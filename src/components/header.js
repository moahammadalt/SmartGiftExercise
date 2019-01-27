import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  
  render() {
    return (
      <header className='header' style={{backgroundColor: this.props.Color_palette.header_color}}>
					<a href='/'>
						<img className="logo" src="https://www.smartgiftit.com/wp-content/uploads/2018/12/sg-logo-smartgift-full-v1.svg" alt="SmartGift" />
					</a>
			</header>
    );
  }
}

export default connect(state => state)(Header);
