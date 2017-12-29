import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/users';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions';

class UserContainer extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { users } = this.props;
    return (
      <ul>
        {users.map(user => (
          <li key={user.Id}>
            <Link to={`/users/${user.Id}`}>{user.Id}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state)
});

export default connect(mapStateToProps, { getAllUsers })(UserContainer);
