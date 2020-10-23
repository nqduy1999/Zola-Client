import { FRIENDS_TYPE } from 'constant/friendType';

const initialState = {
  listFriendPhoneBook: [],
  listFriendContact: [],
  listFriendRequest: [],
  message: '',
  errorStatus: null,
  errorData: null,
  loading: false
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_TYPE.FETCH_PHONE_BOOK_SUCCESS: {
      return { ...state };
    }

    // case FRIENDS_TYPE.FETCH_PHONE_BOOK_FAILURE: {
    //   const { error, data } = action.payload;
    //   return { ...state, errorStatus: error, errorData: data };
    // }

    case FRIENDS_TYPE.FETCH_FRIEND_CONTACT_SUCCESS: {
      return { ...state, listFriendContact: action.payload };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_CONTACT_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, errorStatus: error, errorData: data };
    }
    case FRIENDS_TYPE.SEARCH_FRIEND_REQUEST: {
      return { ...state, loading: true };
    }
    case FRIENDS_TYPE.SEARCH_FRIEND_SUCCESS: {
      return { ...state, loading: false };
    }
    case FRIENDS_TYPE.SEARCH_FRIEND_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};
export default FriendReducer;
