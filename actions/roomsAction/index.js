import ROOMS_TYPE from 'constant/roomsTypes';
import { roomService } from 'services';

export const editRoomNameAction = (idRoom, roomName) => dispatch => {
  dispatch({
    type: ROOMS_TYPE.EDIT_ROOM_NAME_REQUEST
  });

  roomService
    .editRoomName(idRoom, roomName)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: ROOMS_TYPE.EDIT_ROOM_NAME_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: ROOMS_TYPE.EDIT_ROOM_NAME_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};
export const dispatchDefaulRoomstAction = () => ({
  type: 'DEFAULT_ROOMS_ACTION'
});
