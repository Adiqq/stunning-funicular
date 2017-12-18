import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter,
  form: formReducer
});

export default rootReducer;
