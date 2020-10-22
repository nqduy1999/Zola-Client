import axios from 'utils/service/axiosServices';
const prefix = 'https://api-ret.ml/api/v0/images/';

class UploadServices {
  uploadImgSingleService = formData => {
    return axios.request({
      method: 'POST',
      url: `${prefix}upload-avatar`,
      data: formData
    });
  };
  getImgService = value => {
    return axios.request({
      method: 'GET',
      url: `${prefix}download/${value}`
    });
  };
}
export default UploadServices;
