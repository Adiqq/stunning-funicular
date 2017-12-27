import {
  PRICE_FILTER_CHANGED,
  ROOM_AREA_FILTER_CHANGED,
  NUMBER_OF_ROOMS_FILTER_CHANGED,
  BALCONY_FILTER_CHANGED
} from '../constants/ActionTypes';

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case PRICE_FILTER_CHANGED:
      return {
        ...state,
        priceRange: {
          ...state.priceRange,
          ...action.priceRange
        }
      };
    case ROOM_AREA_FILTER_CHANGED:
      return {
        ...state,
        roomAreaRange: {
          ...state.roomAreaRange,
          ...action.roomAreaRange
        }
      };
    case NUMBER_OF_ROOMS_FILTER_CHANGED:
      return {
        ...state,
        numberOfRoomsRange: {
          ...state.numberOfRoomsRange,
          ...action.numberOfRoomsRange
        }
      };
    case BALCONY_FILTER_CHANGED:
      return {
        ...state,
        balcony: action.balcony
      };
    default:
      return state;
  }
};
export const getPriceRange = state => {
  if (state.priceRange) {
    return state.priceRange;
  }
  return {};
};
export const getRoomAreaRange = state => {
  if (state.roomAreaRange) {
    return state.roomAreaRange;
  }
  return {};
};
export const getNumberOfRoomsRange = state => {
  if (state.numberOfRoomsRange) {
    return state.numberOfRoomsRange;
  }
  return {};
};

export const getBalcony = state => {
  return state.balcony;
};

export default filterReducer;
