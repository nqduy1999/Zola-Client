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
}
export default UserServices;
