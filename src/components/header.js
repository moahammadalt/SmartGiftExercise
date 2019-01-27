import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Header extends Component {
  
  render() {
    return (
      <header className='header' style={{backgroundColor: this.props.Color_palette.header_color}}>
          <Link to={`/`}>
						<img className="logo" src="https://www.smartgiftit.com/wp-content/uploads/2018/12/sg-logo-smartgift-full-v1.svg" alt="SmartGift" />
          </Link>
			</header>
    );
  }
}

export default connect(state => state)(Header);
