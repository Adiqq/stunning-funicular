import { LOGIN_USER_SUCCESS, SIGNOUT } from '../constants/ActionTypes';
import { get } from 'lodash';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      const newState = {
        ...state,
        ...action.user
      };
      localStorage.setItem('user', JSON.stringify(newState));
      return newState;
    case SIGNOUT:
      localStorage.removeItem('user');
      return {};
    default:
      return state;
  }
};

export const getId = state => {
  return get(state, 'user.Id');
};

export const getRole = state => {
  return get(state, 'user.Role');
};

export default userReducer;
