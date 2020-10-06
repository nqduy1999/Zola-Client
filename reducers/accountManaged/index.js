import { AUTHENTICATION_TYPE } from 'constant';

const initialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  auth_token: null,
  message: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_TYPE.SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        message: null,
        auth_token: action.payload
      };
    case AUTHENTICATION_TYPE.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        message: action.payload.data[0]
      };
    case AUTHENTICATION_TYPE.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default loginReducer;
