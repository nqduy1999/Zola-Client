import axios from 'utils/service/axiosServices';
const prefix = 'accounts/';
class AccountServices {
  SignInService = data => {
    return axios.request({
      method: 'POST',
      url: `${prefix}signin`,
      data: data
    });
  };
  SignUpService = data => {
    return axios.request({
      method: 'POST',
      url: `${prefix}signup`,
      data: data
    });
  };
  ActiveService = data => {
    return axios.request({
      method: 'POST',
      url: `${prefix}code/verify`,
      data: data
    });
  };
  sendOtpService = apiDefault => {
    return axios.request({
      method: 'GET',
      url: `${prefix}${apiDefault}`
    });
  };
  sendOtpForgotService = value => {
    return axios.request({
      method: 'GET',
      url: `${prefix}passwords/forgot?${value}`
    });
  };
  verifyForgotAccountService = data => {
    return axios.request({
      method: 'POST',
      url: `${prefix}code/password/verify`,
      data: data
    });
  };
  changePasswordService = data => {
    return axios.request({
      method: 'POST',
      url: `${prefix}passwords/change`,
      data: data
    });
  };
}
export default AccountServices;
