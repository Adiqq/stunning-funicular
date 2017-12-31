import { RECEIVE_FLAT_OFFERS } from '../constants/ActionTypes';
import { denormalize } from 'normalizr';
import { flatOfferList } from '../api/schema';
import { get } from 'lodash';

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

export const getMessages = state => {
  return state && state.FlatOffers
    ? denormalize(state.Result, flatOfferList, state)
    : [];
};

export const getMessageCount = state => {
  let offers = get(state, 'flatOffers.Result');
  return offers ? offers.length : 0;
};

export default flatOffersReducer;
