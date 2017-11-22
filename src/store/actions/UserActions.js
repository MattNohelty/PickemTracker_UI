import * as types from './ActionTypes';

export const addUser = (user) => {
  return {
    type: types.ADD_USER,
    user
  };
}

export const removeUser = () => {
  return {
    type: types.REMOVE_USER
  };
}