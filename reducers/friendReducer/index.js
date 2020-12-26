import { FRIENDS_TYPE } from 'constant/friendType';

const initialState = {
  listFriendPhoneBook: [],
  listFriendContact: [],
  listFriendRequest: [],
  listUserSentReq: [],
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
      return { ...state, errorData: action.payload.data };
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
    case FRIENDS_TYPE.ADD_FRIEND_REQUEST: {
      return { ...state, loading: true };
    }
    case FRIENDS_TYPE.ADD_FRIEND_SUCCESS: {
      return { ...state, loading: false };
    }
    case FRIENDS_TYPE.ADD_FRIEND_FAILURE: {
      return { ...state, loading: false };
    }
    //Get List Friend Request
    case FRIENDS_TYPE.FETCH_FRIEND_REQUEST_SUCCESS: {
      return { ...state, listFriendRequest: action.payload };
    }

    case FRIENDS_TYPE.FETCH_FRIEND_REQUEST_FAILURE: {
      return {
        ...state,
        errorDataRequest: action.payload.data,
        listFriendRequest: []
      };
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
    case FRIENDS_TYPE.DELETE_FRIEND_PHONE_CONTACT_FAILURE: {
      return { ...state, listFriendContact: [] };
    }
    case FRIENDS_TYPE.GET_USER_SENT_REQUEST_REQUEST: {
      return { ...state, loading: true };
    }
    case FRIENDS_TYPE.GET_USER_SENT_REQUEST_SUCCESS: {
      return { ...state, listUserSentReq: action.payload };
    }
    case FRIENDS_TYPE.GET_USER_SENT_REQUEST_FAILURE: {
      return { ...state, loading: false };
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
