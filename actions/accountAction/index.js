import { AUTHENTICATION_TYPE } from 'constant';
import jwtDecode from 'jwt-decode';
import { accountService } from 'services';
import cookiesServices from 'utils/service/cookiesServices';

export const SignInAccount = (dataDispatch, push) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SIGNIN_REQUEST
  });
  return accountService
    .SignInService(dataDispatch)
    .then(res => {
      cookiesServices.setToken(res.data);
      push('/home');
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNIN_SUCCESS,
        payload: {
          auth_token: res.data,
          data: dataDispatch
        }
      });
      return { error: false, data: res.data };
    })
    .catch(err => {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNIN_FAILURE
      });
      return { error: true, data: err.response.data[0].msg };
    });
};
export const SignUp = (push, dataDispatch) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SIGNUP_REQUEST
  });
  return accountService
    .SignUpService(dataDispatch)
    .then(res => {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNUP_SUCCESS
      });
      cookiesServices.clearToken();
      push('/');
      return { error: false, data: res.data };
    })
    .catch(err => {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNUP_FAILURE
      });
      return { error: true, data: err.response.data[0].msg };
    });
};
export const saveAccount = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.ACCOUNT_REQUEST,
    payload: {
      dataDispatch
    }
  });
};
export const activeAccount = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.ACTIVE_REQUEST
  });
  return accountService
    .ActiveService(dataDispatch)
    .then(res => {
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_SUCCESS
      });
      return { error: false, data: res.data };
    })
    .catch(err => {
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_FAILURE
      });
      return { error: true, data: err.response.data.message };
    });
};
export const sendOtp = apiDefault => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SEND_OTP_REQUEST
  });
  return accountService
    .sendOtpService(apiDefault)
    .then(res => {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_SUCCESS
      });
      return { error: false, data: res.data };
    })
    .catch(err => {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FAILURE
      });
      return { error: true, data: err.response.data[0].msg };
    });
};
export const isTokenExpired = () => dispatch => {
  const token = cookiesServices.getAccessToken();
  const refeshToken = cookiesServices.getRefreshToken();
  if (token) {
    const isExpired = jwtDecode(token)?.exp - jwtDecode(token)?.iat;
    if (isExpired > 0) {
      dispatch({
        type: AUTHENTICATION_TYPE.IS_LOGIN_REQUEST,
        payload: { accessToken: token, refreshToken: refeshToken }
      });
    }
  }
};
export const accountLogout = push => dispatch => {
  cookiesServices.clearToken();
  push('/');
  dispatch({
    type: AUTHENTICATION_TYPE.LOGOUT_REQUEST
  });
};
export const sendOtpForgot = value => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SEND_OTP_REQUEST
  });
  return accountService
    .sendOtpForgotService(value)
    .then(res => {
      console.log(res);
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_SUCCESS
      });
      return { error: false, data: res.data };
    })
    .catch(err => {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FAILURE
      });
      return { error: false, data: err.response.data[0].msg };
    });
};
export const verifyForgotAccount = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.ACTIVE_REQUEST
  });
  return accountService
    .verifyForgotAccountService(dataDispatch)
    .then(res => {
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_SUCCESS
      });
      cookiesServices.setToken(res.data);
      return { error: false, data: res?.data };
    })
    .catch(err => {
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_FAILURE
      });
      return { error: true, data: err.response.data[0].msg };
    });
};
export const changePassword = (push, dataDispatch) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_REQUEST
  });
  return accountService.changePasswordService(dataDispatch).then(res => {
    dispatch({
      type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_SUCCESS,
      payload: {
        data: res.data
      }
    });
    cookiesServices.clearToken();
    push('/');
    return { error: false, data: res.data };
  });
};
export const changePasswordUser = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_REQUEST
  });
  return accountService.changePasswordService(dataDispatch).then(res => {
    const { error, data, message } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data, message };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.CHANGE_PASSWORD_SUCCESS
      });
      return { error, data };
    }
  });
};
