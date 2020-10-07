import { AUTHENTICATION_TYPE } from 'constant';
import axiosServices from 'services/axiosServices';

const prefix = 'accounts/';
export const SignUpAccount = dataDispatch => dispatch => {
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
