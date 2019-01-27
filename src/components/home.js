import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			products: [43448, 53279, 54890]
		}
		
	}

  componentDidMount(){
    
  }
  
  render() {
    return (
			<div className="home-container container m-t-30">
			<h3 className="col-md-6 col-md-offset-3 m-b-30">Choose product: <br /></h3>
			
			{this.state.products.map((code, index) => (
				<div key={index} className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="panel panel-info">
							<div className="panel-heading">product:</div>
							<div className="panel-body">
								<h4 className="col-md-9">{code}</h4>
								<Link to={`/product/${code}`}>go to product {' >'}</Link>
							</div>
						</div>
					</div>
				</div>
			))}
			</div>
    );
  }
}

export default Home;
