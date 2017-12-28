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

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <MainMenu />
      <Switch>
        <Route
          path="/apartament/details/:id"
          component={FlatDetailsContainer}
        />
        <Route path="/apartament/:id?" component={FlatEditContainer} />
        <Route path="/messages" component={MessagesContainer} />
        <Route path="/picture" component={ImageUploadTest} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/" component={FlatContainer} />
      </Switch>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
