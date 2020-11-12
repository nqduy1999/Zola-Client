import { MESSAGE_TYPE } from 'constant/messageType';
import axiosServices from 'utils/service/axiosServices';

const prefix = 'rooms/';

export const getListMessage = page => dispatch => {
  dispatch({
    type: MESSAGE_TYPE.FETCH_LIST_MESSAGE_REQUEST
  });
  return axiosServices
    .get(`${prefix}currentPage=${page}&perPage=9`)
    .then(res => {
      const { error, data } = res.data;
      console.log(data);
      if (!error) {
        dispatch({
          type: MESSAGE_TYPE.FETCH_LIST_MESSAGE_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error } = err.response.data;
      dispatch({
        type: MESSAGE_TYPE.FETCH_LIST_MESSAGE_FAILURE
      });
      return error;
    });
};