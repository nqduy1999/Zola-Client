import { combineReducers } from 'redux';
import accountData from './accountManaged';
import userData from './userReducer';
import FriendReducer from './friendReducer';
import messageData from './messageReducer';

export default combineReducers({
  accountData,
  userData,
  FriendReducer,
  messageData
});
