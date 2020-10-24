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
  acceptFriend = (userID, userIDWantAccept) => {
    return axios.request({
      method: 'POST',
      url: `users/accepFriend`,
      data: {
        user_id: userID,
        user_id_want_accept: userIDWantAccept
      }
    });
  };
  avoidFriendRequest = (userID, userIDWantAvoid) => {
    return axios.request({
      method: 'POST',
      url: `users/deletePhoneByIdRequest`,
      data: {
        user_id: userID,
        user_id_want_delete: userIDWantAvoid
      }
    });
  };

  deleteFriendByPhoneBook = (userID, userIDWantDelete) => {
    return axios.request({
      method: 'POST',
      url: `users/deletePhoneByIdPhoneBook`,
      data: {
        user_id: userID,
        user_id_want_delete: userIDWantDelete
      }
    });
  };

  deleteFriendContact = (userID, userIDWantDelete) => {
    return axios.request({
      method: 'POST',
      url: `users/deletePhoneByIdContact`,
      data: {
        user_id: userID,
        user_id_want_delete: userIDWantDelete
      }
    });
  };
}

export default FriendService;
