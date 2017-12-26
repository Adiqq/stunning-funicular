import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flats from './flats';

const rootReducer = combineReducers({
  flats,
  form: formReducer
});

export default rootReducer;
