import axios from 'utils/service/axiosServices';

class GroupChatService {
  createGroupChat = values => {
    return axios.request({
      method: 'POST',
      url: 'https://api-chat.ga/api/v0/rooms/group',
      data: {
        name: values.name,
        list_user_id: values.list_user_id
      }
    });
  };
  exitGroupChat = id => {
    return axios.request({
      method: 'PUT',
      url: `https://api-chat.ga/api/v0/rooms/exit?id=${id}`
    });
  };
}

export default GroupChatService;
