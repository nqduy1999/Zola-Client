import axios from 'utils/service/axiosServices';

class GroupChatService {
  createGroupChat = values => {
    return axios.request({
      method: 'POST',
      url: 'rooms/group',
      data: {
        name: values.name,
        list_user_id: values.list_user_id
      }
    });
  };
  exitGroupChat = id => {
    return axios.request({
      method: 'PUT',
      url: `rooms/exit?id=${id}`
    });
  };
}

export default GroupChatService;
