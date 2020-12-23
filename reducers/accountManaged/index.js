import { AUTHENTICATION_TYPE } from 'constant';

const initialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  auth_token: null,
  message: null,
  data: null,
  status: null
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
        message: null,
        auth_token: action.payload.auth_token,
        data: action.payload.data
      };
    case AUTHENTICATION_TYPE.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false
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
    case AUTHENTICATION_TYPE.SEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.SEND_OTP_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.IS_LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: true,
        auth_token: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;
