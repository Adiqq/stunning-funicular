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
        entities: state.entities.Users.filter(
          user => user.Id !== action.user.Id
        ),
        result: state.result.filter(id => id !== action.user.Id)
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
  return getUsers(state).filter(user => user.Id === id);
};

export default usersReducer;
