export const getProfileUser = (type, value) => dispatch => {
  dispatch({
    type: USER_TYPE.GET_DATA_USER_REQUEST
  });
  return axiosServices.get(`${prefix}profile?${type}=${value}`).then(res => {
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
