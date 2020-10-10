import { AUTHENTICATION_TYPE } from 'constant';
import jwtDecode from 'jwt-decode';
import axiosServices from 'services/axiosServices';
import cookiesServices from 'services/cookiesServices';

const prefix = 'accounts/';
export const SignInAccount = (dataDispatch, push) => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SIGNIN_REQUEST
  });
  return axiosServices
    .post(`${prefix}signin`, dataDispatch)
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
export const SignUp = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.SIGNUP_REQUEST
  });
  return axiosServices.post(`${prefix}signup`, dataDispatch).then(res => {
    const { error, data } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNUP_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SIGNUP_SUCCESS
      });
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
  return axiosServices.post(`${prefix}active`, dataDispatch).then(res => {
    const { error, data } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_FAILURE
      });
      return { error, data };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.ACTIVE_SUCCESS
      });
    }
  });
};
export const sendOtp = apiDefault => dispatch => {
  console.log(apiDefault);
  dispatch({
    type: AUTHENTICATION_TYPE.SEND_OTP_REQUEST
  });
  return axiosServices.get(`${prefix}${apiDefault}`).then(res => {
    const { error } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_FAILURE
      });
      return { error, data };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.SEND_OTP_SUCCESS
      });
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
