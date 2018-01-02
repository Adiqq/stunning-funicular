import flats from '../api/flats';
import flatOffers from '../api/flatOffers';
import users from '../api/user';
import * as types from '../constants/ActionTypes';
import { normalize } from 'normalizr';
import * as schema from '../api/schema';
import history from '../helpers/history';
import { get, mapValues } from 'lodash';
import { SubmissionError } from 'redux-form';
import { mapErrors } from '../helpers/validation';
import uuidv4 from 'uuid/v4';
const receiveFlats = flats => ({
  type: types.RECEIVE_FLATS,
  flats
});

const addFlatSuccess = message => ({
  type: types.ADD_FLAT_SUCCESS,
  message
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
  let promise = flats.post(flat);
  promise
    .then(response => {
      dispatch(
        addFlatSuccess({
          id: uuidv4(),
          message: 'Dodano mieszkanie'
        })
      );
      history.push('/');
    })
    .catch(reason => {
      dispatch(addFlatError());
    });
  return promise;
};
const updateFlatSuccess = message => ({
  type: types.UPDATE_FLAT_SUCCESS,
  message
});
const updateFlatError = flat => ({
  type: types.UPDATE_FLAT_ERROR,
  flat
});

export const updateFlat = flat => dispatch => {
  let promise = flats.put(flat);
  promise
    .then(response => {
      dispatch(
        updateFlatSuccess({
          id: uuidv4(),
          message: 'Zapisano mieszkanie'
        })
      );
    })
    .catch(reason => {
      dispatch(updateFlatError(reason));
    });
  return promise;
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

const flatBuyOfferSuccess = message => ({
  type: types.FLAT_BUY_OFFER_SUCCESS,
  message
});
const flatBuyOfferError = message => ({
  type: types.FLAT_BUY_OFFER_ERROR,
  message
});

export const wantBuy = flatId => dispatch => {
  console.log('wantbuy');
  flatOffers
    .post(flatId)
    .then(response => {
      console.log(response);
      dispatch(
        flatBuyOfferSuccess({
          id: uuidv4(),
          message: 'Złożono ofertę kupna dla wybranego mieszkania'
        })
      );
      getAllFlats()(dispatch);
    })
    .catch(reason => {
      dispatch(
        flatBuyOfferError({
          id: uuidv4(),
          message: 'Nie udało się złożyć oferty kupna'
        })
      );
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
  type: types.REJECT_FLAT_OFFER_SUCCESS,
  message
});
const deleteFlatOfferError = message => ({
  type: types.REJECT_FLAT_OFFER_ERROR,
  message
});

export const deleteFlatOffer = message => dispatch => {
  flatOffers
    .delete(message)
    .then(response => {
      dispatch(
        deleteFlatOfferSuccess({
          id: uuidv4(),
          message: 'Odrzucono ofertę'
        })
      );
      getAllFlatOffers()(dispatch);
    })
    .catch(reason => {
      dispatch(
        deleteFlatOfferError({
          id: uuidv4(),
          message: 'Nie udało się odrzucić oferty'
        })
      );
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
      dispatch(
        acceptFlatOfferSuccess({
          id: uuidv4(),
          message: 'Zaakceptowano ofertę'
        })
      );
      getAllFlatOffers()(dispatch);
    })
    .catch(reason => {
      dispatch(
        acceptFlatOfferError({
          id: uuidv4(),
          message: 'Nie udało się zaakceptować oferty'
        })
      );
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
  const promise = users.login(token);

  return promise
    .then(response => {
      localStorage.setItem('token', token);
      dispatch(loginUserSuccess(response.data));
      getAllFlatOffers()(dispatch);
      history.push('/');
    })
    .catch(reason => {
      dispatch(loginUserError());
      if (reason.response.status === 401) {
        throw new SubmissionError({ _error: 'Nieprawidłowe dane' });
      } else {
        throw new SubmissionError({ _error: 'Błąd wewnętrzny serwera' });
      }
    });
};

const registerUserSuccess = message => ({
  type: types.REGISTER_USER_SUCCESS,
  message
});
const registerUserError = () => ({
  type: types.REGISTER_USER_ERROR
});
export const register = data => dispatch => {
  data.phoneNumber = '+48' + data.phoneNumber;
  return users
    .register(data)
    .then(response => {
      dispatch(
        registerUserSuccess({
          id: uuidv4(),
          message: `Zarejestrowano użytkownika ${data.email}`
        })
      );
      history.push('/login');
    })
    .catch(reason => {
      dispatch(registerUserError());
      mapErrors(reason);
    });
};

export const signout = () => {
  localStorage.removeItem('token');
  users.signout();
  return {
    type: types.SIGNOUT
  };
};

const changePasswordSuccess = message => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  message
});
const changePasswordError = message => ({
  type: types.CHANGE_PASSWORD_ERROR,
  message
});

export const changePassword = (user, data) => dispatch => {
  users
    .changePassword({
      userId: user.Id,
      password: data.password
    })
    .then(result => {
      dispatch(
        changePasswordSuccess({
          id: uuidv4(),
          message: 'Zmieniono hasło'
        })
      );
    })
    .catch(reason => {
      dispatch(
        changePasswordError({
          id: uuidv4(),
          message: 'Nie udało się zmienić hasła'
        })
      );
    });
};

const deleteUserSuccess = message => ({
  type: types.DELETE_USER_SUCCESS,
  message
});

const deleteUserError = message => ({
  type: types.DELETE_USER_ERROR,
  message
});

export const deleteUser = user => dispatch => {
  users
    .deleteUser(user.Id)
    .then(result => {
      dispatch(
        deleteUserSuccess({
          id: uuidv4(),
          message: `Usunięto użytkownika ${user.Id}`
        })
      );
      history.push('/users');
    })
    .catch(reason => {
      dispatch(
        deleteUserError({
          id: uuidv4(),
          message: 'Nie udało się usunąć użytkownika'
        })
      );
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

export const removeSuccessNotification = (id, timeout) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: types.REMOVE_SUCCESS_NOTIFICATION,
      id
    });
  }, timeout);
};

export const removeErrorNotification = (id, timeout) => dispatch => {
  setTimeout(() => {
    dispatch({
      type: types.REMOVE_ERROR_NOTIFICATION,
      id
    });
  }, timeout);
};

export const flatView = id => ({
  type: types.FLAT_VIEW,
  id
});

export const deleteFlatSuccess = message => ({
  type: types.DELETE_FLAT_SUCCESS,
  message
});

export const deleteFlatError = message => ({
  type: types.DELETE_FLAT_ERROR,
  message
});

export const deleteFlat = id => dispatch => {
  return flats
    .delete(id)
    .then(result => {
      dispatch(
        deleteFlatSuccess({
          id: uuidv4(),
          message: 'Usunięto mieszkanie'
        })
      );
      history.push('/');
    })
    .catch(reason => {
      dispatch(
        deleteFlatError({
          id: uuidv4(),
          message: 'Nie udało się usunąć mieszkania'
        })
      );
    });
};
