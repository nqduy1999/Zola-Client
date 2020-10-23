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

export const acceptFriendAction = (userID, userIDWantAccept) => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.ACCEPT_FRIEND_REQUEST
  });
  friendService
    .acceptFriend(userID, userIDWantAccept)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: FRIENDS_TYPE.ACCEPT_FRIEND_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.ACCEPT_FRIEND_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const avoidFriendRequestAcion = (
  userID,
  userIDWantAvoid
) => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.AVOID_FRIEND_REQUEST
  });
  friendService
    .avoidFriendRequest(userID, userIDWantAvoid)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: FRIENDS_TYPE.AVOID_FRIEND_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.AVOID_FRIEND_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const dispatchDefaultAction = () => ({
  type: 'DEFAULT_ACTION'
});
