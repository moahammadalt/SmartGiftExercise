import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import * as H from './globals/helper';
import Home from './components/home';
import NotFound from './components/not_found';
import Header from './components/header';
import ProductContainer from './components/product_detail/product_container'
import Modal from './components/modal';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      authenticated: false,
    };
  }

  componentDidMount(){

    const now_time = (Math.floor(Date.now() / 1000));

    // check if the auth token is saved in the lcoalstorage to pass the authentication post request;
    if(this.props.Cached_apis['/auth'] && (this.props.Cached_apis['/auth'].expire_at > now_time)){
      
      H.set_authorization_token(this.props.Cached_apis['/auth'].data);
      this.setState({authenticated: true});

    }
    else{
      let params = {
        client_id: "FQtKaLZrnF5RQeNtrtkqopQmqi2O5CmsM!DRSKIK3ZzvT1rBLr",
        secret: "lLt5VBVb2EpdVXvAa6!XxVxL5AtXxQDCR!lvSHA7AonkFpP!!T"
      };

      H.api.post('/auth', params, (data)=>{

        this.props.Set_auth_token(data.token);
        H.set_authorization_token(data.token);
        this.setState({authenticated: true});

        // update cached api data with it's expire data
        let cached_apis = {...this.props.Cached_apis};
        cached_apis['/auth'] = {
          expire_at: now_time + H.get_caching_time(),
          data: data.token
        }
        this.props.Set_cached_apis(cached_apis);
        
      });
    }
    
  }
  
  render() {
    return (
      <div className="app-container" style={{backgroundColor: this.props.Color_palette.background_color}}>
        
        <Router>
          <React.Fragment>
            <Modal />
            <Alert stack={{limit: 1}} effect='slide' beep={false} position='bottom-right' timeout={4000} html={true} />
            <Header />
            {this.state.authenticated ?
              <React.Fragment>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/product/:code" component={ProductContainer} />
                  <Route path='*' exact={true} component={NotFound} />
                </Switch>
              </React.Fragment> :
              <div className="loading"></div>
            }
          </React.Fragment>
        </Router>
        
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Set_auth_token: (val) => {
      dispatch({
        type: 'SET_AUTHENTICATION_TOKEN',
        payload: val
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
