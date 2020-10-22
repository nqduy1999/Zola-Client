import { uploadService } from 'services';

export const uploadImgSingle = formData => {
  return uploadService.uploadImgSingleService(formData).then(res => {
    return res?.data;
  });
};
export const getImg = values => {
  return uploadService.getImgService(values).then(res => {
    return res?.data;
  });
};
