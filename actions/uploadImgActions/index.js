import axiosServices from 'services/axiosServices';

const prefix = 'https://api-ret.ml/api/v0/images/';

export const uploadImgSingle = formData => {
  return axiosServices.post(`${prefix}upload-avatar`, formData).then(res => {
    return res?.data;
  });
};
