import { LOGIN_USER_SUCCESS } from '../constants/ActionTypes';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
};

export const isLoggedIn = state => {
  return state.Id;
};

export const getRole = state => {
  return state.Role;
};

export default usersReducer;
