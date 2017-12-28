import { RECEIVE_FLATS } from '../constants/ActionTypes';
import { denormalize } from 'normalizr';
import { flatList } from '../api/schema';
import { get } from 'lodash';

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
  return state && state.flats && state.flats.Flats
    ? denormalize(state.flats.Result, flatList, state.flats)
    : [];
};

export const getFlat = (state, id) => {
  let flat =
    state && state.flats && state.flats.Flats && id
      ? denormalize([id], flatList, state.flats)[0]
      : undefined;
  return flat;
};

export const getVisibleFlats = state => {
  return getFlats(state).filter(flat => {
    const minPrice = get(state, 'filters.priceRange.min');
    const maxPrice = get(state, 'filters.priceRange.max');
    if (minPrice && flat.Price < minPrice) return false;
    if (maxPrice && flat.Price > maxPrice) return false;
    const minRoomArea = get(state, 'filters.roomAreaRange.min');
    const maxRoomArea = get(state, 'filters.roomAreaRange.max');
    if (minRoomArea && flat.RoomArea < minRoomArea) return false;
    if (maxRoomArea && flat.RoomArea > maxRoomArea) return false;
    const minNumberOfRooms = get(state, 'filters.numberOfRoomsRange.min');
    const maxNumberOfRooms = get(state, 'filters.numberOfRoomsRange.max');
    if (minNumberOfRooms && flat.NumberOfRooms < minNumberOfRooms) return false;
    if (maxNumberOfRooms && flat.NumberOfRooms > maxNumberOfRooms) return false;
    const balcony = get(state, 'filters.balcony');
    if (balcony === true && !flat.HasBalcony) return false;
    if (balcony === false && flat.HasBalcony) return false;

    return true;
  });
};
export default flatsReducer;
