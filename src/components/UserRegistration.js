import React, { Component } from 'react';

import PageHeader from './PageHeader';

import { createUser } from '../service/UserService';

class UserRegistration extends Component {

  constructor() {
    super()
    this.state = {
      user: {}
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  
  /*
  Services
  */

  saveUser(evt) {
    evt.preventDefault();
    createUser(this.state.user).then(() => {
      alert("Success"); //TODO
    });
  }


  /*
  Input Change Handlers
  */

  handleNameInputChange(paramName, event) {
    const target = event.target;
    const value = target.value;

    var user = this.state.user;

    if (paramName === 'firstName') {
      user.firstName = value;
    }
    if (paramName === 'lastName') {
      user.lastName = value;
    }
    if (paramName === 'email') {
      user.email = value;
    }

    this.setState({ user: user });
  }


  /*
  Helpers
  */
  validateForm() {
    var user = this.state.user;
    return !this.isEmpty(user.firstName) && !this.isEmpty(user.lastName) && !this.isEmpty(user.email);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }


  render() {

    return (

      <div>
        <PageHeader headingText={"Register User"} />

        <form>
          <div className="form-group">
            
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName" name="firstName" placeholder="Bill"
              type="text"
              className="form-control"
              onChange={(evt) => this.handleNameInputChange("firstName", evt)} />
            
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName" name="lastName" placeholder="Smith"
              type="text"
              className="form-control"
              onChange={(evt) => this.handleNameInputChange("lastName", evt)} />
            
            <label htmlFor="email">Email:</label>
            <input
              id="email" name="email" placeholder="bill@example.com"
              type="text"
              className="form-control"
              onChange={(evt) => this.handleNameInputChange("email", evt)} />

            <button className="btn btn-info log" disabled={!this.validateForm()} onClick={this.saveUser}>Register</button>

          </div>
        </form>

      </div>
    );
  }
}

export default UserRegistration;
