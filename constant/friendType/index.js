import createRequestTypes from '../constype';
export const FRIENDS_TYPE = {
  ...createRequestTypes('FRIENDS', 'FETCH_PHONE_BOOK'),
  ...createRequestTypes('FRIENDS', 'FETCH_FRIEND_CONTACT'),
  ...createRequestTypes('FRIENDS', 'FETCH_FRIEND_REQUEST'),
  ...createRequestTypes('FRIENDS', 'ADD_FRIEND'),
  ...createRequestTypes('FRIENDS', 'AVOID_FRIEND'),
  ...createRequestTypes('FRIENDS', 'ACCEPT_FRIEND')
};
