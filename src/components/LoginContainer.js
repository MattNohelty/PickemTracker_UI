import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Login from './Login';
import * as UserActions from '../store/actions/UserActions'

import PageHeader from './PageHeader';


class LoginContainer extends Component {

  render() {

    return (

      <div>
        <PageHeader headingText={"Log In"} />
        
        <Login login={this.props.login}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login: UserActions.addUser}, dispatch);
}

export default connect(null,mapDispatchToProps)(LoginContainer);
