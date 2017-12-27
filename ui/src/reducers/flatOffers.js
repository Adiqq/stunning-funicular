import { RECEIVE_FLAT_OFFERS } from '../constants/ActionTypes';

const flatOffersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FLAT_OFFERS:
      return {
        ...state,
        ...action.offers.entities,
        Result: action.offers.result
      };
    default:
      return state;
  }
};

export default flatOffersReducer;
