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
      <nav className="panel">
        {users.map(user => (
          <Link key={user.Id} to={`/users/${user.Id}`} className="panel-block">
            {user.Id}
          </Link>
        ))}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state)
});

export default connect(mapStateToProps, { getAllUsers })(UserContainer);
