import React, { Component } from 'react';
class Header extends Component {
  
  render() {
    return (
      <header className='header'>
					<a href='/'>
						<img className="logo" src="https://www.smartgiftit.com/wp-content/uploads/2018/12/sg-logo-smartgift-full-v1.svg" alt="SmartGift" />
					</a>
			</header>
    );
  }
}

export default Header;
