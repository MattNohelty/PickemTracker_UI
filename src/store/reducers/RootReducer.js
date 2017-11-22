import user from './UserReducer.js';
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
  user
});

export default RootReducer;