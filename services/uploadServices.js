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
}
export default UploadServices;
