import axios from 'utils/service/axiosServices';

class RoomService {
  editRoomName = (idRoom, roomName) => {
    return axios.request({
      method: 'PUT',
      url: `https://api-chat.ga/api/v0/rooms?id=${idRoom}`,
      data: roomName
    });
  };
}
export default RoomService;
