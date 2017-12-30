import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import MainMenu from '../components/MainMenu';
import ImageUploadTest from './ImageUploadTest';
import FlatContainer from './FlatContainer';
import FlatDetailsContainer from './FlatDetailsContainer';
import FlatEditContainer from './FlatEditContainer';
import MessagesContainer from './MessagesContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import PrivateRoute from './PrivateRoute';
import UserContainer from './UserContainer';
import UserDetailsContainer from './UserDetailsContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <MainMenu />
      <Switch>
        <PrivateRoute
          path="/apartament/details/:id"
          component={FlatDetailsContainer}
        />
        <PrivateRoute path="/apartament/:id?" component={FlatEditContainer} />
        <PrivateRoute path="/messages" component={MessagesContainer} />
        <PrivateRoute path="/users/:id" component={UserDetailsContainer} />
        <PrivateRoute path="/users" component={UserContainer} />
        <Route path="/picture" component={ImageUploadTest} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <PrivateRoute path="/" component={FlatContainer} />
      </Switch>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
