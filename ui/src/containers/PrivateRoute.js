import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../reducers/users';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state.users)
});

export default connect(mapStateToProps)(PrivateRoute);
