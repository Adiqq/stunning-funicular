import flats from '../api/flats';
import * as types from '../constants/ActionTypes';
import { normalize } from 'normalizr';
import * as schema from '../api/schema';

const receiveFlats = flats => ({
  type: types.RECEIVE_FLATS,
  flats
});

export const getAllFlats = () => dispatch => {
  console.log('getting');
  flats.get().then(response => {
    console.log(normalize(response.data, schema.flatList));
    dispatch(receiveFlats(normalize(response.data, schema.flatList)));
  });
};
