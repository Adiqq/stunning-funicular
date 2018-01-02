import { FLAT_VIEW, SIGNOUT } from '../constants/ActionTypes';

const flatViewsReducer = (state = [], action) => {
  switch (action.type) {
    case FLAT_VIEW:
      if (state.includes(action.id)) return state;
      let newState;
      if (state.length >= 3) {
        newState = [...state.slice(1), action.id];
      } else {
        newState = [...state, action.id];
      }
      window.localStorage.setItem('flatViews', JSON.stringify(newState));
      return newState;
    case SIGNOUT:
      window.localStorage.removeItem('flatViews');
      return [];
    default:
      return state;
  }
};

export default flatViewsReducer;
