import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import EditApartament from '../EditApartament';
import Content from '../Content';
import MainMenu from '../MainMenu';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <MainMenu />
      <Route exact={true} path="/" component={Content} />
      <Route path="/apartament/:id?" component={EditApartament} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
