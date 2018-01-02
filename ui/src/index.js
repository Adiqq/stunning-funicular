import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import Root from './containers/Root';
import * as action from './actions';
import history from './helpers/history';
import * as axios from 'axios/index';
import { getAllFlatOffers } from './actions';
import { getAllFlats } from './actions';

const token = localStorage.getItem('token');
const userSerialized = localStorage.getItem('user');
let state = {};
if (userSerialized) {
  const user = JSON.parse(userSerialized);
  const flatViewsSerialized = localStorage.getItem('flatViews');
  const flatViews = flatViewsSerialized ? JSON.parse(flatViewsSerialized) : [];
  state = {
    user,
    flatViews
  };
  axios.defaults.headers.common['Authorization'] = token;
}
const store = configureStore(state);
if (userSerialized) {
  store.dispatch(getAllFlats());
  store.dispatch(getAllFlatOffers());
}
render(
  <Router history={history}>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
