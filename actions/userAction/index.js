import USER_TYPE from 'constant/userTypes';
import axiosServices from 'utils/service/axiosServices';
import jwt_decode from 'jwt-decode';
import { userService } from 'services';
const prefix = 'users/';
export const getProfileUser = auth_token => dispatch => {
  dispatch({
    type: USER_TYPE.GET_DATA_USER_REQUEST
  });
  const type = JSON.parse(localStorage.getItem('type'));
  let decoded = null;
  let value = null;
  if (auth_token) decoded = jwt_decode(auth_token.accessToken);
  if (decoded?.data?.phone && decoded?.data?.email) {
    if (type == 'phone') {
      value = decoded?.data?.phone;
    } else {
      value = decoded?.data?.email;
    }
  } else {
    value = decoded?.data?.phone || decoded?.data?.email;
  }
  return axiosServices
    .get(`${prefix}detail?${type}=${value}`)
    .then(res => {
      dispatch({
        type: USER_TYPE.GET_DATA_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: USER_TYPE.GET_DATA_USER_FAILURE
      });
    });
};
export const updateProfileUser = dataDispatch => async dispatch => {
  dispatch({
    type: USER_TYPE.UPDATE_USER_REQUEST
  });
  return userService
    .updateProfileUserService(dataDispatch)
    .then(() => {
      dispatch({
        type: USER_TYPE.UPDATE_USER_SUCCESS,
        payload: dataDispatch
      });
    })
    .catch(() => {
      dispatch({
        type: USER_TYPE.UPDATE_USER_FAILURE
      });
    });
};
export const updateOtpUser = dataDispatch => dispatch => {
  dispatch({
    type: USER_TYPE.UPDATE_USER_REQUEST
  });
  return userService
    .updateOtpUserService(dataDispatch)
    .then(res => {
      dispatch({
        type: USER_TYPE.UPDATE_USER_SUCCESS
      });
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: USER_TYPE.UPDATE_USER_FAILURE
      });
      return { error: true, message: err.response?.data };
    });
};
export const findUserByIdAction = id => dispatch => {
  dispatch({
    type: USER_TYPE.FIND_USER_REQUEST
  });
  return userService
    .findUserById(id)
    .then(res => {
      if (!error) {
        dispatch({
          type: USER_TYPE.FIND_USER_SUCCESS,
          payload: res.data
        });
      }
      return res.data;
    })
    .catch(() => {
      dispatch({
        type: USER_TYPE.FIND_USER_FAILURE
      });
    });
};
