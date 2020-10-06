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
    case AUTHENTICATION_TYPE.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        message: null,
        auth_token: action.payload
      };
    case AUTHENTICATION_TYPE.LOGIN_FAILURE:
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
    case AUTHENTICATION_TYPE.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case AUTHENTICATION_TYPE.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTHENTICATION_TYPE.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTHENTICATION_TYPE.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default loginReducer;
