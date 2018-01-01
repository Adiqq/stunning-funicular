import flats from '../api/flats';
import flatOffers from '../api/flatOffers';
import users from '../api/user';
import * as types from '../constants/ActionTypes';
import { normalize } from 'normalizr';
import * as schema from '../api/schema';
import history from '../helpers/history';
import { DELETE_USER_ERROR } from '../constants/ActionTypes';

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
const updateFlatSuccess = flat => ({
  type: types.UPDATE_FLAT_SUCCESS,
  flat
});
const updateFlatError = flat => ({
  type: types.UPDATE_FLAT_ERROR,
  flat
});

export const updateFlat = flat => dispatch => {
  flats
    .put(flat)
    .then(response => {
      dispatch(updateFlatSuccess(response.data));
    })
    .catch(reason => {
      dispatch(updateFlatError(reason));
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

const deleteFlatOfferSuccess = message => ({
  type: types.DELETE_FLAT_OFFER_SUCCESS,
  message
});
const deleteFlatOfferError = message => ({
  type: types.DELETE_FLAT_OFFER_ERROR,
  message
});

export const deleteFlatOffer = message => dispatch => {
  flatOffers
    .delete(message)
    .then(response => {
      dispatch(deleteFlatOfferSuccess(message));
    })
    .catch(reason => {
      dispatch(deleteFlatOfferError(message));
    });
};

const acceptFlatOfferSuccess = message => ({
  type: types.ACCEPT_FLAT_OFFER_SUCCESS,
  message
});

const acceptFlatOfferError = message => ({
  type: types.ACCEPT_FLAT_OFFER_ERROR,
  message
});

export const acceptFlatOffer = message => dispatch => {
  flatOffers
    .put(message)
    .then(result => {
      dispatch(acceptFlatOfferSuccess(message));
    })
    .catch(reason => {
      dispatch(acceptFlatOfferError(message));
    });
};

const loginUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  user
});
const loginUserError = () => ({
  type: types.LOGIN_USER_ERROR
});

export const login = data => dispatch => {
  let token = `Basic ${btoa(`${data.email}:${data.password}`)}`;
  users
    .login(token)
    .then(response => {
      dispatch(loginUserSuccess(response.data));
      history.push('/');
    })
    .catch(reason => {
      dispatch(loginUserError());
    });
};

const registerUserSuccess = () => ({
  type: types.REGISTER_USER_SUCCESS
});
const registerUserError = () => ({
  type: types.REGISTER_USER_ERROR
});
export const register = data => dispatch => {
  users
    .register(data)
    .then(response => {
      dispatch(registerUserSuccess());
    })
    .catch(reason => {
      dispatch(registerUserError());
    });
};

export const signout = () => {
  users.signout();
  return {
    type: types.SIGNOUT
  };
};

const changePasswordSuccess = user => ({
  types: types.CHANGE_PASSWORD_SUCCESS,
  user
});
const changePasswordError = user => ({
  types: types.CHANGE_PASSWORD_ERROR,
  user
});

export const changePassword = (user, data) => dispatch => {
  users
    .changePassword({
      userId: user.Id,
      password: data.password
    })
    .then(result => {
      dispatch(changePasswordSuccess(user));
    })
    .catch(reason => {
      dispatch(changePasswordError(user));
    });
};

const deleteUserSuccess = user => ({
  type: types.DELETE_USER_SUCCESS,
  user
});

const deleteUserError = user => ({
  type: types.DELETE_USER_ERROR,
  user
});

export const deleteUser = user => dispatch => {
  users
    .deleteUser(user.Id)
    .then(result => {
      dispatch(deleteUserSuccess(user));
    })
    .catch(reason => {
      dispatch(deleteUserError(user));
    });
};

const receiveUsers = users => ({
  type: types.RECEIVE_USERS,
  users
});

export const getAllUsers = () => dispatch => {
  users.getAll().then(result => {
    console.log(normalize(result.data, schema.userList));
    dispatch(receiveUsers(normalize(result.data, schema.userList)));
  });
};
