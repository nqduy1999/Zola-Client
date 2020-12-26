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
  fetchFriendsRequest = () => {
    return axios.request({
      method: 'GET',
      url: `users/getListRequestId`
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
  acceptFriend = (userID, userIDWantAccept) => {
    return axios.request({
      method: 'POST',
      url: `users/accepFriend`,
      data: {
        user_id: String(userID),
        user_id_want_accept: String(userIDWantAccept)
      }
    });
  };
  avoidFriendRequest = userIDWantAvoid => {
    return axios.request({
      method: 'DELETE',
      url: `users/requests/deletePhone?user_id_want_delete=${userIDWantAvoid}`
    });
  };

  deleteFriendByPhoneBook = userIDWantDelete => {
    return axios.request({
      method: 'DELETE',
      url: `users/phonebooks/deletePhone?user_id_want_delete=${userIDWantDelete}`
    });
  };

  deleteFriendContact = userIDWantDelete => {
    return axios.request({
      method: 'DELETE',
      url: `users/contacts/deletePhone?user_id_want_delete=${userIDWantDelete}`
    });
  };
  getUserSentRequest = () => {
    return axios.request({
      method: 'GET',
      url: `users/request/sent`
    });
  };
}

export default FriendService;
