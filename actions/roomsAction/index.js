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

export const addUserToGroupAction = (idRoom, list_user_id) => dispatch => {
  dispatch({
    type: ROOMS_TYPE.ADD_USER_TO_GROUP_REQUEST
  });

  roomService
    .addUserToGroup(idRoom, list_user_id)
    .then(res => {
      const { error, message } = res.data;
      if (!error) {
        dispatch({
          type: ROOMS_TYPE.ADD_USER_TO_GROUP_SUCCESS,
          payload: message
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: ROOMS_TYPE.ADD_USER_TO_GROUP_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};

export const getDetailGroupAction = idRoom => dispatch => {
  console.log(idRoom);
  dispatch({
    type: ROOMS_TYPE.GET_DETAIL_GROUP_REQUEST
  });
  roomService
    .getDetailGroup(idRoom)
    .then(res => {
      dispatch({
        type: ROOMS_TYPE.GET_DETAIL_GROUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ROOMS_TYPE.GET_DETAIL_GROUP_FAILURE,
        payload: {
          data: err.response?.data
        }
      });
    });
};

export const deleteRoomAction = idRoom => dispatch => {
  dispatch({
    type: ROOMS_TYPE.DELETE_ROOM_REQUEST
  });

  roomService
    .deleteRoom(idRoom)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ROOMS_TYPE.DELETE_ROOM_SUCCESS,
        payload: res.data.message
      });
    })
    .catch(err => {
      dispatch({
        type: ROOMS_TYPE.DELETE_ROOM_FAILURE,
        payload: {
          data: err.response?.data
        }
      });
    });
};

export const dispatchDefaulRoomstAction = () => ({
  type: 'DEFAULT_ROOMS_ACTION'
});

export const dispatchDefaulMessagetAddUserToGroupAction = () => ({
  type: 'DEFAULT_MESSAGE_ADD_USER_TO_GROUP_ACTION'
});

export const dispatchDefaulMessageDeleteRoomAction = () => ({
  type: 'DEFAULT_MESSAGE_DELETE_ROOM_ACTION'
});
