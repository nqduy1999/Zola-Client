import axios from 'utils/service/axiosServices';

class RoomService {
  editRoomName = (idRoom, roomName) => {
    return axios.request({
      method: 'PUT',
      url: `https://api-chat.ga/api/v0/rooms?id=${idRoom}`,
      data: roomName
    });
  };
  addUserToGroup = (idRoom, list_user_id) => {
    return axios.request({
      method: 'PUT',
      url: `https://api-chat.ga/api/v0/rooms/members?id=${idRoom}`,
      data: {
        list_user_id
      }
    });
  };
  deleteRoom = idRoom => {
    return axios.request({
      method: 'DELETE',
      url: `https://api-chat.ga/api/v0/rooms?id=${idRoom}`
    });
  };
}
export default RoomService;
