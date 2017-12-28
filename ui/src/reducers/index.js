import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flats from './flats';
import filters from './filters';
import flatOffers from './flatOffers';
import users from './users';

const rootReducer = combineReducers({
  filters,
  flats,
  flatOffers,
  form: formReducer,
  users
});

export default rootReducer;
