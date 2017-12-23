import flats from '../api/flats';
import * as types from '../constants/ActionTypes';

const receiveFlats = flats => ({
  type: types.RECEIVE_FLATS,
  flats
});

export const getAllFlats = () => dispatch => {
  flats.get().then(response => {
    dispatch(receiveFlats(response.data));
  });
};
