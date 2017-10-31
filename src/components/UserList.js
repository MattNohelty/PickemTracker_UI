import React, { Component } from 'react';
import Nav from './Nav';
import PageHeader from './PageHeader';
import { getAllUsers } from '../service/UserService';


class UserList extends Component {

  constructor() {
    super()
    this.state = { users: [] };
  }

  getUsers() {
    getAllUsers().then((users) => {
      this.setState({ users });
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  formatDate(millis) {
    var createDate = new Date(millis);
    return createDate.toLocaleString();
  }

  render() {

    const { users }  = this.state;

    return (
      <div>

        <Nav />

        <PageHeader headingText="Users"/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            { users.map((user, index) => (
              <tr key={ user.id }>
                <td>{ user.id }</td>
                <td>{ user.firstName }</td>
                <td>{ user.lastName }</td>
                <td>{ user.email }</td>
                <td>{ this.formatDate(user.createdDate) }</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default UserList;
