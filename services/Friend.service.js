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
  searchFriendByEmailorPhone = value => {
    return axios.request({
      method: 'GET',
      url: `users/textSearch?value=${value}`
    });
  };
  addFriend = value => {
    return axios.request({
      method: 'POST',
      url: `users/addFriend`,
      data: value
    });
  };
}

export default FriendService;
