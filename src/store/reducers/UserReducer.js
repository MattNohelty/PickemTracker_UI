import * as types from '../actions/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return action.user
    default:
      return state;
  }
};