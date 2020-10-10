import USER_TYPE from 'constant/userTypes';
import axiosServices from 'services/axiosServices';
import jwt_decode from 'jwt-decode';
const prefix = 'users/';
export const getProfileUser = auth_token => dispatch => {
  dispatch({
    type: USER_TYPE.GET_DATA_USER_REQUEST
  });
  const type = JSON.parse(localStorage.getItem('type'));
  let decoded = null;
  if (auth_token) decoded = jwt_decode(auth_token.accessToken);
  const value = decoded?.data?.phone || decoded?.data?.email;
  return axiosServices.get(`${prefix}detail?${type}=${value}`).then(res => {
    const { error, data } = res.data;
    if (error) {
      dispatch({
        type: USER_TYPE.GET_DATA_USER_FAILURE
      });
      return error;
    }
    if (!error) {
      dispatch({
        type: USER_TYPE.GET_DATA_USER_SUCCESS,
        payload: data
      });
    }
  });
};
export const updateProfileUser = dataDispatch => async dispatch => {
  console.log(dataDispatch);
  dispatch({
    type: USER_TYPE.UPDATE_USER_REQUEST
  });
  return axiosServices
    .put(`${prefix}profile/update`, dataDispatch)
    .then(res => {
      console.log(res);
      const { error } = res;
      if (error) {
        dispatch({
          type: USER_TYPE.UPDATE_USER_FAILURE
        });
      }
      if (!error) {
        dispatch({
          type: USER_TYPE.UPDATE_USER_SUCCESS,
          payload: dataDispatch
        });
      }
    });
};
