import { FRIENDS_TYPE } from 'constant/friendType';

const initialState = {
  listFriendPhoneBook: [],
  listFriendContact: [],
  listFriendRequest: [],
  errorStatus: null,
  errorStatusRequest: null,
  errorData: null,
  errorDataRequest: null,
  messageAccept: '',
  messageAvoid: '',
  loading: false
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_TYPE.FETCH_FRIEND_CONTACT_SUCCESS: {
      return { ...state, listFriendContact: action.payload };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_CONTACT_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, errorStatus: error, errorData: data };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_REQUEST_SUCCESS: {
      return { ...state, listFriendRequest: action.payload };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_REQUEST_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, errorStatusRequest: error, errorDataRequest: data };
    }

    case FRIENDS_TYPE.ACCEPT_FRIEND_SUCCESS: {
      return { ...state, messageAccept: action.payload };
    }

    case FRIENDS_TYPE.AVOID_FRIEND_SUCCESS: {
      return { ...state, messageAvoid: action.payload };
    }

    case 'DEFAULT_ACTION': {
      return {
        ...state,
        errorStatus: null,
        errorStatusRequest: null,
        errorData: null,
        errorDataRequest: null,
        messageAccept: '',
        messageAvoid: '',
        loading: false
      };
    }
    default:
      return state;
  }
};
export default FriendReducer;
