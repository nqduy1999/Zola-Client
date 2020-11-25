import createRequestTypes from '../constype';
export const MESSAGE_TYPE = {
  ...createRequestTypes('MESSAGE', 'FETCH_LIST_MESSAGE'),
  ...createRequestTypes('MESSAGE', 'FETCH_MESSAGE_ROOM')
};
