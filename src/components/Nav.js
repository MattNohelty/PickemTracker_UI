import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from './ButtonLink';
import '../App.css';

class Nav extends Component {

  render() {

    const weekNumber = 1;
    const year = 2017;

    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/users">NFL Pickem</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/user/register">Register</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to={"/week/" + year + "/" + weekNumber + "/games"}>Games</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><ButtonLink url="/user/register" text="Sign Up" class="btn btn-info log"/></li>
          <li><button className="btn btn-info log">Log In</button></li>
          <li><button className="btn btn-danger log">Log out </button></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
