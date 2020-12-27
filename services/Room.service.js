import axios from 'utils/service/axiosServices';

class RoomService {
  editRoomName = (idRoom, roomName) => {
    return axios.request({
      method: 'PUT',
      url: `rooms/${idRoom}`,
      data: roomName
    });
  };

  addUserToGroup = (idRoom, list_user_id) => {
    return axios.request({
      method: 'PUT',
      url: `rooms/members?id=${idRoom}`,
      data: {
        list_user_id
      }
    });
  };

  getDetailGroup = idRoom => {
    return axios.request({
      method: 'GET',
      url: `rooms/${idRoom}`
    });
  };

  deleteRoom = idRoom => {
    return axios.request({
      method: 'DELETE',
      url: `rooms/${idRoom}`
    });
  };
}
export default RoomService;
