import React, { Component } from 'react';
import * as H from '../globals/helper';
import { Panel } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink,match } from "react-router-dom";

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
			<div className="container m-t-30">
			{this.state.products.map((code, index) => (
				<div key={index} className="row">
					<div className="col-md-6">
						<div className="panel panel-info">
							<div className="panel-heading">product:</div>
							<div className="panel-body">
								<h4 className="col-md-9">{code}</h4>
								<Link to={`/product/${code}`}>go to product</Link>
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
