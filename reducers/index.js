import { combineReducers } from 'redux';
import accountData from './accountManaged';
import userData from './userReducer';

export default combineReducers({ accountData, userData });
