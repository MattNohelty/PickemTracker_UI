import RootReducer from './reducers/RootReducer';
import {createStore} from 'redux';

export default (initialState) => {
  return createStore(RootReducer, initialState);
};