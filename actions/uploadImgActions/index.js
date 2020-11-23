import axiosServices from 'utils/service/axiosServices';

export const uploadImgSingle = formData => {
  return axiosServices
    .post(`https://api-ret.ml/api/v0/files/upload`, formData)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      console.log(err);
    });
};
