import { DELETE_USER_SUCCESS, RECEIVE_USERS } from '../constants/ActionTypes';
import { get } from 'lodash';
import { userList } from '../api/schema';
import { denormalize } from 'normalizr';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        result: state.result.filter(id => id !== action.message.id)
      };
    default:
      return state;
  }
};

export const getUsers = state => {
  return get(state, 'users.entities')
    ? denormalize(state.users.result, userList, state.users.entities)
    : [];
};

export const getUser = (state, id) => {
  let users = getUsers(state);
  let user = users.filter(user => user.Id === id)[0];
  return user;
};

export default usersReducer;
