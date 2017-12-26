import { RECEIVE_FLATS } from '../constants/ActionTypes';
import { denormalize } from 'normalizr';
import { flatList } from '../api/schema';

const flatsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FLATS:
      return {
        ...state,
        ...action.flats.entities,
        Result: action.flats.result
      };
    default:
      return state;
  }
};

export const getFlats = state => {
  return state && state.Flats ? denormalize(state.Result, flatList, state) : [];
};

export const getFlat = (state, id) => {
  let flat =
    state && state.Flats && id
      ? denormalize([id], flatList, state)[0]
      : undefined;
  return flat;
};
export default flatsReducer;
