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

export default usersReducer;
