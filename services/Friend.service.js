import axios from 'utils/service/axiosServices';
class FriendService {
  fetchFriendsByPhoneBook = id => {
    return axios.request({
      method: 'GET',
      url: `users/getListPhoneBookById?userId=${id}`
    });
  };
  fetchFriendsContact = id => {
    return axios.request({
      method: 'GET',
      url: `users/getListContactId?userId=${id}`
    });
  };
  fetchFriendsRequest = id => {
    return axios.request({
      method: 'GET',
      url: `users/getListRequestId?userId=${id}`
    });
  };
}

export default FriendService;
