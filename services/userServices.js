import axios from 'utils/service/axiosServices';
const prefix = 'users/';

class UserServices {
  updateProfileUserService = data => {
    return axios.request({
      method: 'PUT',
      url: `${prefix}profile/update`,
      data: data
    });
  };
  updateOtpUserService = data => {
    return axios.request({
      method: 'PUT',
      url: `${prefix}profile/contact/update`,
      data: data
    });
  };
  findUserById = id => {
    return axios.request({
      method: 'GET',
      url: `${prefix}detail?id=${id}`
    });
  };
}
export default UserServices;
