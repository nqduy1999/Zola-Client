import { FRIENDS_TYPE } from 'constant/friendType';
import { friendService } from 'services';

export const fetchFriendsByPhoneBookAction = id => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.FETCH_PHONE_BOOK_REQUEST
  });

  friendService
    .fetchFriendsByPhoneBook(id)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: FRIENDS_TYPE.FETCH_PHONE_BOOK_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.FETCH_PHONE_BOOK_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const fetchFriendsContactAction = id => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.FETCH_FRIEND_CONTACT_REQUEST
  });

  friendService
    .fetchFriendsContact(id)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: FRIENDS_TYPE.FETCH_FRIEND_CONTACT_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.FETCH_FRIEND_CONTACT_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const fetchFriendsRequestAction = id => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.FETCH_FRIEND_REQUEST_REQUEST
  });

  friendService
    .fetchFriendsRequest(id)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: FRIENDS_TYPE.FETCH_FRIEND_REQUEST_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.FETCH_FRIEND_REQUEST_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};
export const searchFriendAction = value => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.SEARCH_FRIEND_REQUEST
  });
  return friendService
    .searchFriendByEmailorPhone(value)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: FRIENDS_TYPE.SEARCH_FRIEND_SUCCESS
      });
      return data;
    })
    .catch(err => {
      console.log(err);
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.SEARCH_FRIEND_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};
export const addFriendAction = value => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.ADD_FRIEND_REQUEST
  });
  return friendService
    .addFriend(value)
    .then(res => {
      dispatch({
        type: FRIENDS_TYPE.ADD_FRIEND_SUCCESS
      });
      return res;
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.ADD_FRIEND_FAILURE,
        payload: {
          error,
          data
        }
      });
      return err.response?.data;
    });
};
