import axiosServices from 'utils/service/axiosServices';

const prefix = 'https://api-ret.ml/api/v0/files/upload';

export const uploadImgSingle = formData => {
  return axiosServices.post(`${prefix}`, formData).then(res => {
    return res?.data;
  });
};
