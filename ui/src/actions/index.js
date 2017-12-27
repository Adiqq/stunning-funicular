import flats from '../api/flats';
import flatOffers from '../api/flatOffers';
import * as types from '../constants/ActionTypes';
import { normalize } from 'normalizr';
import * as schema from '../api/schema';

const receiveFlats = flats => ({
  type: types.RECEIVE_FLATS,
  flats
});

const addFlatSuccess = flat => ({
  type: types.ADD_FLAT_SUCCESS,
  flat
});
const addFlatError = () => ({
  type: types.ADD_FLAT_ERROR
});
export const getAllFlats = () => dispatch => {
  flats.get().then(response => {
    console.log(normalize(response.data, schema.flatList));
    dispatch(receiveFlats(normalize(response.data, schema.flatList)));
  });
};
export const addFlat = flat => dispatch => {
  flats.post(flat).then(response => {
    dispatch(addFlatSuccess(response.data));
  });
};

export const priceFilterChange = priceRange => ({
  type: types.PRICE_FILTER_CHANGED,
  priceRange
});

export const numberOfRoomsFilterChange = numberOfRoomsRange => ({
  type: types.NUMBER_OF_ROOMS_FILTER_CHANGED,
  numberOfRoomsRange
});

export const roomAreaFilterChange = roomAreaRange => ({
  type: types.ROOM_AREA_FILTER_CHANGED,
  roomAreaRange
});

export const balconyFilterChange = balcony => ({
  type: types.BALCONY_FILTER_CHANGED,
  balcony
});

const flatBuyOfferSuccess = flat => ({
  type: types.FLAT_BUY_OFFER_SUCCESS,
  flat
});
const flatBuyOfferError = () => ({
  type: types.FLAT_BUY_OFFER_ERROR
});

export const wantBuy = flatId => dispatch => {
  console.log('wantbuy');
  flatOffers.post(flatId).then(response => {
    console.log(response);
    dispatch(flatBuyOfferSuccess(flatId));
  });
};

const receiveFlatOffers = offers => ({
  type: types.RECEIVE_FLAT_OFFERS,
  offers
});
export const getAllFlatOffers = () => dispatch => {
  flatOffers.get().then(response => {
    console.log(normalize(response.data, schema.flatOfferList));
    dispatch(receiveFlatOffers(normalize(response.data, schema.flatOfferList)));
  });
};
