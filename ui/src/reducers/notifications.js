import * as types from '../constants/ActionTypes';
import { get } from 'lodash';

const notificationsReducer = (
  state = {
    successes: [],
    errors: []
  },
  action
) => {
  let index;
  switch (action.type) {
    case types.ACCEPT_FLAT_OFFER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
    case types.FLAT_BUY_OFFER_SUCCESS:
    case types.REJECT_FLAT_OFFER_SUCCESS:
    case types.ADD_FLAT_SUCCESS:
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.DELETE_USER_SUCCESS:
    case types.UPDATE_FLAT_SUCCESS:
    case types.DELETE_FLAT_SUCCESS:
      return {
        ...state,
        successes: [...state.successes, action.message]
      };
    case types.ACCEPT_FLAT_OFFER_ERROR:
    case types.REJECT_FLAT_OFFER_ERROR:
    case types.FLAT_BUY_OFFER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_FLAT_ERROR:
    case types.DELETE_FLAT_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.message]
      };
    case types.REMOVE_SUCCESS_NOTIFICATION:
      index = state.successes.findIndex(
        notification => notification.id === action.id
      );
      if (index < 0) return state;
      return {
        ...state,
        successes: [
          ...state.successes.slice(0, index),
          ...state.successes.slice(index + 1)
        ]
      };
    case types.REMOVE_ERROR_NOTIFICATION:
      index = state.errors.findIndex(
        notification => notification.id === action.id
      );
      if (index < 0) return state;
      return {
        ...state,
        errors: [
          ...state.errors.slice(0, index),
          ...state.errors.slice(index + 1)
        ]
      };
    default:
      return state;
  }
};

export const getSuccessNotifications = state => state.notifications.successes;

export const getErrorNotifications = state => state.notifications.errors;

export default notificationsReducer;
