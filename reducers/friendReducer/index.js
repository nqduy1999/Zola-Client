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
  messageDeletePhoneBook: '',
  messageDeletePhoneContact: '',
  loading: false
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get List Friend Phone Book
    case FRIENDS_TYPE.FETCH_PHONE_BOOK_SUCCESS: {
      return { ...state, listFriendPhoneBook: action.payload };
    }

    // Get List Friend Contact
    case FRIENDS_TYPE.FETCH_FRIEND_CONTACT_SUCCESS: {
      return { ...state, listFriendContact: action.payload };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_CONTACT_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, errorStatus: error, errorData: data };
    }

    //Get List Friend Request
    case FRIENDS_TYPE.FETCH_FRIEND_REQUEST_SUCCESS: {
      return { ...state, listFriendRequest: action.payload };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_REQUEST_FAILURE: {
      const { error, data } = action.payload;
      return { ...state, errorStatusRequest: error, errorDataRequest: data };
    }

    //ACCEPT Friend Request
    case FRIENDS_TYPE.ACCEPT_FRIEND_SUCCESS: {
      return { ...state, messageAccept: action.payload };
    }

    //AVOID Friend request
    case FRIENDS_TYPE.AVOID_FRIEND_SUCCESS: {
      return { ...state, messageAvoid: action.payload };
    }

    // DELETE Friend Phone Book
    case FRIENDS_TYPE.DELETE_FRIEND_PHONE_BOOK_SUCCESS: {
      return { ...state, messageDeletePhoneBook: action.payload };
    }

    //DELETE friend Contact
    case FRIENDS_TYPE.DELETE_FRIEND_PHONE_CONTACT_SUCCESS: {
      return { ...state, messageDeletePhoneContact: action.payload };
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
        messageDeletePhoneBook: '',
        messageDeletePhoneContact: '',
        loading: false
      };
    }
    default:
      return state;
  }
};
export default FriendReducer;
