import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import * as action from './actions';

const store = configureStore();
store.dispatch(action.getAllFlats());

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
