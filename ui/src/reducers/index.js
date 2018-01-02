import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flats from './flats';
import filters from './filters';
import flatOffers from './flatOffers';
import user from './user';
import users from './users';
import notifications from './notifications';
import flatViews from './flatViews';

const rootReducer = combineReducers({
  filters,
  flats,
  flatOffers,
  flatViews,
  form: formReducer,
  notifications,
  user,
  users
});

export default rootReducer;
