import { MESSAGE_TYPE } from 'constant/messageType';
import axiosServices from 'utils/service/axiosServices';

const prefix = 'rooms?';

export const getListMessage = page => dispatch => {
  dispatch({
    type: MESSAGE_TYPE.FETCH_LIST_MESSAGE_REQUEST
  });
  return axiosServices
    .get(`${prefix}currentPage=${page}&perPage=9`)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: MESSAGE_TYPE.FETCH_LIST_MESSAGE_SUCCESS,
          payload: {
            messageRooms: data.itemsList,
            paginator: data.paginator
          }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: MESSAGE_TYPE.FETCH_LIST_MESSAGE_FAILURE
      });
      return err.response?.msg;
    });
};
export const getDetailMesage = id => dispatch => {
  dispatch({
    type: MESSAGE_TYPE.FETCH_MESSAGE_ROOM_REQUEST
  });
  return axiosServices
    .get(`${prefix}detail?id=${id}`)
    .then(res => {
      dispatch({
        type: MESSAGE_TYPE.FETCH_MESSAGE_ROOM_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: MESSAGE_TYPE.FETCH_MESSAGE_ROOM_FAILURE
      });
      return err?.response?.msg;
    });
};
