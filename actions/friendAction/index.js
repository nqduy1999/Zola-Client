import { FRIENDS_TYPE } from 'constant/friendType';
import { friendService } from 'services';
import axiosApiInstance from 'utils/service/axiosServices';

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
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: FRIENDS_TYPE.FETCH_FRIEND_REQUEST_SUCCESS,
          payload: data
        });
      }
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
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.SEARCH_FRIEND_FAILURE
      });
      return { error, data };
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
export const addFriendAction = value => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.ADD_FRIEND_REQUEST
  });
  return friendService
    .addFriend(value)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: FRIENDS_TYPE.ADD_FRIEND_SUCCESS
      });
      return { data };
    })
    .catch(err => {
      const { error } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.ADD_FRIEND_FAILURE
      });
      return { error };
    });
};
export const deleteFriendByPhoneBookAction = (
  userID,
  userIDWantDelete
) => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.DELETE_FRIEND_PHONE_BOOK_REQUEST
  });
  friendService
    .deleteFriendByPhoneBook(userID, userIDWantDelete)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: FRIENDS_TYPE.DELETE_FRIEND_PHONE_BOOK_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.DELETE_FRIEND_PHONE_BOOK_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const deleteFriendContactAction = (
  userID,
  userIDWantDelete
) => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.DELETE_FRIEND_PHONE_CONTACT_REQUEST
  });
  friendService
    .deleteFriendContact(userID, userIDWantDelete)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: FRIENDS_TYPE.DELETE_FRIEND_PHONE_CONTACT_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.DELETE_FRIEND_PHONE_CONTACT_FAILURE,
        payload: {
          error,
          data
        }
      });
      return err.response?.data;
    });
};
export const getUserSentRequestAction = () => dispatch => {
  dispatch({
    type: FRIENDS_TYPE.GET_USER_SENT_REQUEST_REQUEST
  });
  return axiosApiInstance
    .get('users/request/sent')
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: FRIENDS_TYPE.GET_USER_SENT_REQUEST_SUCCESS,
        payload: data
      });
      return data;
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: FRIENDS_TYPE.GET_USER_SENT_REQUEST_FAILURE
      });
      return { error, data };
    });
};

export const dispatchDefaultAction = () => ({
  type: 'DEFAULT_ACTION'
});

export const fetchFriendsRequestActionDefault = () => ({
  type: 'DEFAULT_LISTFRIEND_REQUEST'
});
