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
      const { error, data } = res.data;
      if (!error) {
        cookiesServices.setToken(data);
        push('/home');
        dispatch({
          type: AUTHENTICATION_TYPE.SIGNIN_SUCCESS,
          payload: {
            auth_token: data,
            data: dataDispatch
          }
        });
        return { error, data };
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNIN_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data };
    });
};
export const SignUp = (push, dataDispatch) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SIGNUP_REQUEST
  });
  return accountService.SignUpService(dataDispatch).then(res => {
    const { error, data, message } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNUP_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data, message };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNUP_SUCCESS
      });
      cookiesServices.clearToken();
      push('/');
      return { error, data };
    }
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
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: AUTHENTICATION_TYPE.ACTIVE_SUCCESS
        });
        cookiesServices.setToken(data);
        return res?.data;
      }
    })
    .catch(err => {
      const { error, data, message } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_FAILURE
      });
      return { error, data, message };
    });
};
export const sendOtp = apiDefault => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SEND_OTP_REQUEST
  });
  return accountService.sendOtpService(apiDefault).then(res => {
    console.log(res);
    const { error, data, message } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FAILURE,
        payload: {
          error: error,
          data: data
        }
      });
      return { error, data };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_SUCCESS
      });
      return { message };
    }
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
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: AUTHENTICATION_TYPE.SEND_OTP_SUCCESS
        });
        return { message, error };
      }
    })
    .catch(err => {
      const { error, data, message } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FAILURE
      });
      return { error, data, message };
    });
};
export const verifyForgotAccount = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.ACTIVE_REQUEST
  });
  return accountService
    .verifyForgotAccountService(dataDispatch)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: AUTHENTICATION_TYPE.ACTIVE_SUCCESS
        });
        cookiesServices.setToken(data);
        return res?.data;
      }
    })
    .catch(err => {
      const { error, data, message } = err.response?.data;
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_FAILURE
      });
      return { error, data, message };
    });
};
export const changePassword = (push, dataDispatch) => dispatch => {
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
      push('/');
      return { error, data };
    }
  });
};
