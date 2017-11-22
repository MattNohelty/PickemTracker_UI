import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUser} from '../store/actions/UserActions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {}
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById('email').focus();
  }
  
  /*
  Services
  */

  handleSubmit(evt) {
    evt.preventDefault();
    var user = {"firstName":"matt", "lastName":"nohelty", "email":"test@test.com"}
    this.props.login(user);
  }


  /*
  Input Change Handlers
  */

  handleNameInputChange(paramName, event) {
    const target = event.target;
    const value = target.value;

    var credentials = this.state.credentials;

    if (paramName === 'email') {
      credentials.email = value;
    }
    if (paramName === 'password') {
      credentials.password = value;
    }

    this.setState({ credentials: credentials });
  }


  /*
  Helpers
  */
  validateForm() {
    var credentials = this.state.credentials;
    return !this.isEmpty(credentials.email) && !this.isEmpty(credentials.password);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }


  render() {

    return (
        <form>
          <div className="form-group">
            
            <label htmlFor="email">Email:</label>
            <input
              id="email" name="email" placeholder="bill@example.com"
              type="text"
              className="form-control"
              onChange={(evt) => this.handleNameInputChange("email", evt)} />
            
            <label htmlFor="password">Password:</label>
            <input
              id="password" name="password" placeholder="********"
              type="password"
              className="form-control"
              onChange={(evt) => this.handleNameInputChange("password", evt)} />

            <button className="btn btn-info log" disabled={!this.validateForm()} onClick={this.handleSubmit}>Log In</button>

          </div>
        </form>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func.isRequired
};

export default Login;
