import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import EditApartament from '../EditApartament';
import Content from '../Content';
import MainMenu from '../MainMenu';
import ImageUploadTest from './ImageUploadTest';
import FlatContainer from './FlatContainer';
import FlatDetailsContainer from './FlatDetailsContainer';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <MainMenu />
      <Route exact={true} path="/" component={FlatContainer} />
      <Route path="/apartament/:id?" component={FlatDetailsContainer} />
      <Route path="/picture" component={ImageUploadTest} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
