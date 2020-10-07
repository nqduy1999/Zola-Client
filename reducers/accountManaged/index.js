import { AUTHENTICATION_TYPE } from 'constant';

const initialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  auth_token: null,
  message: null,
  data: null
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
    case AUTHENTICATION_TYPE.IS_LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: true,
        auth_token: action.payload
      };
    case AUTHENTICATION_TYPE.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false
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
    case AUTHENTICATION_TYPE.ACCOUNT_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    case AUTHENTICATION_TYPE.ACTIVE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.ACTIVE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.ACTIVE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default loginReducer;
