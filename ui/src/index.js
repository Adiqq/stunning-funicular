import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import Root from './containers/Root';
import * as action from './actions';
import history from './helpers/history';
const store = configureStore();

render(
  <Router history={history}>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
