import { LOGIN_USER_SUCCESS, SIGNOUT } from '../constants/ActionTypes';
import { get } from 'lodash';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.user
      };
    case SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const isLoggedIn = state => {
  return get(state, 'user.Id');
};

export const getRole = state => {
  return get(state, 'user.Role');
};

export default userReducer;
